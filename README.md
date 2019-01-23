# 有道翻译

## How to use?

```shell
$ npm i youdao-translate
```

then

```js
const youdaoTranslate = require('youdao-translate')(<appID>, <appSecret>);
youdaoTranslate('我爱你中国').then(res => {
  console.log(res)
}, err => {
  console.log(err)
});
```

