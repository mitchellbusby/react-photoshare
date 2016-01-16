# react-redux-seed

> Rangle.io official React + Redux seed

## Getting Started
```bash
$ git clone https://github.com/rangle/react-redux-seed
$ npm install
```

## npm scripts

### Dev
```bash
$ npm run dev
```

Open `http://localhost:3000` in your browser.

### Tests

#### Single Run
```bash
$ npm run test
```

#### Watch Files
```bash
$ npm run test:watch
```

#### Coverage
```bash
$ npm run cover
```

### Production
```bash
$ npm run start
```

### Configuration Files

####S3 
Under export/config.js, format it like:
```// config.js
var exports = module.exports = {};

exports.awsAccessKey = "";
exports.awsSecret = "";
exports.awsBucket = "";
exports.photosToUploadFolder = "";
```

## License

Copyright (c) 2015 rangle.io

[MIT License][MIT]

[MIT]: ./LICENSE "Mit License"
