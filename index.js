const express = require("express");
const cheerio = require("cheerio");
const curl = require("curl");
const app = express();
const baseURL = "https://libgen.is/search.php";

app.listen(3001, () => console.log("server is running at port 3001"));

app.get("/", async (req, res, next) => {
  try {
    let search = req.query.search;
    if (search == undefined) throw new Error("search is required.");
    let page = req.query.page || 1;
    let url = `${baseURL}?req=${req.query.search}&page=${page}`;
    let books = [];
    curl.get(url, function (err, response, body) {
      const $ = cheerio.load(response.body);
      var listItems = $("table", response.body);
      var tab3 = listItems[2];
      booksTable = $(tab3).html();
      var trList = $("tr", booksTable);
      trList.each((idx, el) => {
        if (idx == 0) {
          //skip idx 0
        } else {
          let title;
          let md5;
          var tdP = $(el).html();
          var tdList = $("td", tdP);
          let author = $(tdList[1]).text();
          let yr = $(tdList[4]).text();
          let totalPage = $(tdList[5]).text();
          let lan = $(tdList[6]).text();
          let size = $(tdList[7]).text();
          let ext = $(tdList[8]).text();
          let titleList = $(tdList[2]).html();
          var aList = $("a", titleList);
          if (aList.length > 1) {
            let href = $(aList[1]).attr("href");
            md5 = href.split("md5=")[1];
            title = $(aList[1]).text();
          } else {
            let href = $(aList[0]).attr("href");
            md5 = href.split("md5=")[1];
            title = $(aList[0]).text();
          }
          books.push({
            title: title,
            author: author,
            year: yr,
            language: lan,
            download_size: size,
            total_page: totalPage,
            format: ext,
            md5: md5,
          });
        }
      });

      res.json({
        status: true,
        msg: `page ${page} books`,
        data: books,
      });
    });
  } catch (e) {
    res.json({
      status: true,
      msg: e.message || "unknown error",
      data: null,
    });
  }
});

app.get("/detail", async (req, res, next) => {
  try {
    let md5 = req.query.md5;
    if (md5 == undefined) throw new Error("md5 is required.");
    let url = `https://library.lol/main/${md5}`;
    curl.get(url, function (err, response, body) {
      const $ = cheerio.load(response.body);
      var a = $("#download a", response.body);
      if (a.length == 0) {
        res.json({
          status: false,
          msg: "Book not found",
          data: null,
        });
        return;
      }
      var divs = $("div", response.body);
      var img = $("img", response.body);
      let thumbnail = $(img).attr("src");
      let desc = $(divs[divs.length - 1]).text();
      let downloadLink = $(a).attr("href");
      let data = {
        thumbnail: "https://library.lol" + thumbnail || "",
        download_link: downloadLink,
        desc: desc,
      };
      res.json({
        status: true,
        msg: "book detail",
        data: data,
      });
    });
  } catch (e) {
    res.json({
      status: false,
      msg: e.message || "unknown error",
      data: null,
    });
  }
});
