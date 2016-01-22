const path = require('path');
const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const mongo = require('./mongo');
const app = express();
const PORT = process.env.PORT || 3000;
const ADDRESS = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';
const s3 = require('./export/s3_exporter');
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

app.use(bodyParser.json({limit: '5mb'}));

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
  var guestToken = req.body.guestToken;
  mongo.likeAnImage(imgId, guestToken, function(err) {
    if (err) {return res.status(501).send(err);}
    res.json({'Response':'Success'});
  });
});
app.post('/api/unlike', function(req, res) {
  var imgId = req.body.id;
  var guestToken = req.body.guestToken;
  mongo.unlikeAnImage(imgId, guestToken, function(err) {
    if (err) {return res.status(501).send(err);}
    res.json({'Response':'Success'});
  });
});
app.post('/api/submitImage', function(req, res) {
  // export to s3
  var client = s3.createClient();
  var bucketName = s3.config.awsBucket;
  var photoName = req.body.name+'.jpg';
  var photoUri = 'https://'+s3.config.awsRegion+'.amazonaws.com/'+bucketName+'/'+photoName;
  s3.uploadPhotoByStream(req.body.imageData, client, bucketName, photoName, function(err, data) {
    // then export to mongo durr
    if (err) {return res.status(501).send(err);}
    mongo.insertAnImage({
      'url': photoUri,
      location: req.body.location,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      likelog: [],
      date: req.body.date,
    }, function(err, data) {
      if (err) {return res.status(501).send(err);}
      res.json({'Response':'Success'});
    });
});


  // then respond


});
app.listen(PORT, ADDRESS, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://${ ADDRESS }:${ PORT }`);
});
