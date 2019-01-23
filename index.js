const http = require('http');
const crypto = require('crypto');

function md5(str) {
  const md5hash = crypto.createHash('md5');
  return md5hash.update(str).digest('hex').toUpperCase();
}

function configYoudaoTranslate(appID, appSecret) {
  return function youdaoTranslate(content, from = 'auto', to = 'auto') {
    return new Promise((resolve, reject) => {
      const salt = (new Date).getTime();
      const query = Buffer.from(content).toString();
      const signStr = appID + query + salt + appSecret;
      const sign = md5(signStr);
      const requestURL = `http://openapi.youdao.com/api?q=${encodeURIComponent(query)}&appKey=${appID}&salt=${salt}&from=${from}&to=${to}&sign=${sign}`;
      http.get(requestURL, (res) => {
        if (res.statusCode === 200) {
          let buffer = Buffer.from([])
          res.on('data', (chunk) => {
            buffer = Buffer.concat([buffer, chunk]);
          });
          res.on('end', () => {
            resolve(JSON.parse(buffer.toString()))
          });
        }
        else {
          reject(new Error(`请求失败，状态码: ${statusCode}`));
        }
      });
    });
  }
}

module.exports = configYoudaoTranslate;