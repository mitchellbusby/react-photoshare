const path = require('path');
const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const mongo = require('./mongo');
const app = express();
const PORT = process.env.PORT || 3000;

const config = require('./webpack.config');
const compiler = webpack(config);

if (process.env.NODE_ENV !== 'production') {
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
  console.log("Using settings for dev!");

}
else {
  console.log("Using settings for production!");
}

app.use('/static', express.static('dist'));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/allimages', function(req, res) {
  mongo.getAllImages(function(err, data) {
    if (err) {res.json(err);}
    else {
      res.json(data);
    }
  });
});

app.post('/api/like', function(req, res) {
  var imgId = req.body.id;
  mongo.likeAnImage(imgId, function(err) {
    if (err) {return res.status(501).send(err);}
    res.json({'Response':'Success'});
  });
});
app.post('/api/unlike', function(req, res) {
  var imgId = req.body.id;
  mongo.unlikeAnImage(imgId, function(err) {
    if (err) {return res.status(501).send(err);}
    res.json({'Response':'Success'});
  });
});
//app.post('/upload')
app.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${ PORT }`);
});
