// config.js
var exports = module.exports = {};

exports.awsAccessKey = process.env.AWS_ACCESS_KEY;
exports.awsSecret = process.env.AWS_SECRET;
exports.awsBucket = process.env.AWS_BUCKET;
exports.awsRegion = process.env.AWS_REGION;
exports.photosToUploadFolder = "";

exports.mongoConnectionString = process.env.MONGO_CONNECTION_STRING;


console.log(exports);