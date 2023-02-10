
# libgen api 
[libgen.is](https://libgen.is/)

## API Reference

#### Search Book

```http
  GET https://libgen-api.onrender.com/?search=flutter
```
[https://libgen-api.onrender.com/?search=flutter](https://libgen-api.onrender.com/?search=flutter)

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `search` | `string` | **Required**. your search keywords |

#### Get Book Detail

```http
  GET https://libgen-api.onrender.com/?md5=md5Key
```
[https://libgen-api.onrender.com/?md5=md5Key](https://libgen-api.onrender.com/?md5=5A7A41900D988B0F743DE2E90416D58A)

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `md5`      | `string` | **Required**. md5 key from book |



## Technologies

[nodejs](https://nodejs.org/en/)\
[express](https://www.npmjs.com/package/express)\
[cheerio](https://www.npmjs.com/package/cheerio)\
[curl](https://www.npmjs.com/package/curl)

