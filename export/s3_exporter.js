var AWS = require('aws-sdk');
var fs = require('fs');
var config = require('./config');

function createClient(accessKeyId, secretAccessKey) {
	AWS.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey});
	var client = new AWS.S3();
	return client;
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
	buf = new Buffer(binaryImage.replace(/^data:image\/\w+;base64,/, ""),'base64')
	console.log("Uploading file!");

	client.putObject({
		Bucket: bucketName,
		Key: key,
		Body: buf,
		ContentEncoding: 'base64',
		ContentType: 'image/jpeg'
	}, function(err, data) {
		callback(err);
	});
}

function deletePhoto(client, bucketname, key, callback) {

}
/*console.log("Starting client!");
var client = createClient(config.awsAccessKey,config.awsSecret);
console.log("Created client!");
uploadPhoto("photo.jpg", client, config.awsBucket, "photo.jpg", function(err, response) {
	if (err) {console.log(err);}
	else {
		console.log("Success with uploading!");
	}
})*/