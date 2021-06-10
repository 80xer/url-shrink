const express = require('express');
const app = express();
const port = 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/shrink', (req, res) => {
  // 하나의 URL 쇼트너를 생성
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
