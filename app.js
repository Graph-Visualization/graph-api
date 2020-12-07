const graph = require('./graph-base.js');
const express = require('express');
const path = require('path');
const prepResponse = require('./fetch_algo');
const app = express();
const publicDirectoryPath = path.join(__dirname, '/graph-visualization');

var port = process.env.PORT || 8080;

app.use(express.static(publicDirectoryPath));
app.use('/public', express.static('public'));
app.use(express.json());

const prepErrorMsg = (error) => {
  const err = {
    result: 'Content Not found!',
    error,
  };

  return JSON.stringify(err);
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('', (req, res) => {
  res.sendfile('src/main.html');
});

app.get('/visual', (req, res) => {
  res.sendfile('src/visual.html');
});

app.post('/api', (req, res) => {
  try {
    let respp = prepResponse(req.body['values'], req.body['algo']);
    console.log(respp);
    res.json(respp);
  } catch (e) {
    let errorMsg = prepErrorMsg(e);
    res.status(404).json(errorMsg);
  }
});

app.post('/dfs', (req, res) => {
  let respp = prepResponse(req.body['values']);
  console.log(respp);
  res.json(respp);
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
  console.log(publicDirectoryPath);
});
