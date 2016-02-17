var AWS = require('aws-sdk');
var fs = require('fs');
var config = require('./config');

function createClientWithValues(accessKeyId, secretAccessKey) {
	AWS.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey});
	var client = new AWS.S3();
	return client;
}

function createClient() {
	return createClientWithValues(config.awsAccessKey,config.awsSecret);
}

function uploadPhoto(photoUri, client, bucketName, key, callback) {
	// Key is the uri where the picture will go
	console.log("Uploading file!");
	fs.readFile(photoUri, function(err, data){
		if (err) {callback(err);}
		client.putObject({
			Bucket: bucketName,
			Key: key,
			Body: data
		},callback);
	});
}

function uploadPhotoByStream(binaryImage, client, bucketName, key, callback) {
	// Key is the uri where the picture will go
	// thx http://stackoverflow.com/a/26111627
	var buf = new Buffer(binaryImage.replace(/^data:image\/\w+;base64,/, ""),'base64');
	console.log("Uploading file to bucket "+bucketName+"!");
	client.putObject({
		Bucket: bucketName,
		Key: key,
		Body: buf,
		ContentEncoding: 'base64',
		ContentType: 'image/jpeg',
		ACL: "public-read",
	}, function(err, data) {
		console.log("Finished uploading file!");
		if (err) {console.log(err)};
		callback(err, data);
	});
}

function deletePhoto(client, bucketname, key, callback) {

}

var exports = module.exports = { 
	uploadPhoto,
	uploadPhotoByStream,
	deletePhoto,
	config,
	createClient,
};
/*console.log("Starting client!");
var client = createClient(config.awsAccessKey,config.awsSecret);
console.log("Created client!");
uploadPhoto("photo.jpg", client, config.awsBucket, "photo.jpg", function(err, response) {
	if (err) {console.log(err);}
	else {
		console.log("Success with uploading!");
	}
})*/