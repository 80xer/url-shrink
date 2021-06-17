const express = require('express');
const { nanoid } = require('nanoid');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Urls = mongoose.model('Urls', {
  origin: String,
  shrink: String,
  createdAt: { type: Date, default: Date.now },
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  Urls.find(function (err, data) {
    res.render('main', { data });
  });
});

app.post('/shrink', (req, res) => {
  const id = nanoid();
  const url = new Urls({
    origin: req.body.url,
    shrink: id,
  });
  url.save().then((result) => {
    console.log(`result`, result);
  });
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
