// mongodb
var MongoClient = require('mongodb').MongoClient;
var DB_URI = require('./export/config').mongoUri;

var client = function(DB_URI, callback) {
	MongoClient.connect(DB_URI, callback);
}

var getAllImages = function(callback) {
	client(DB_URI, function(err, db) {
		if (err || db==null) {
			callback("Error in connecting to database");
		}
		var cur = db.collection('images').find({});
		cur.toArray(function(err, collection) {
			console.log(collection);
			db.close();
			callback(err, collection);
		})
	});
}
var insertAnImage = function(imageData, callback) {
	client(DB_URI, function(err, db) {
		if (err) {return callback(err);}
		db.collection('images').insert(imageData);
		callback();
	})
}
var deleteAnImage = function() {

}
var likeAnImage = function(id, guestToken, callback) {
	client(DB_URI, function(err, db) {
		if (err) {return callback(err);}
		db.collection('images').update({'id':id}, {
			$inc: {
				likes: 1
			},
			$push: {
				likelog: {'token': guestToken, 'time': Date() }
			}
		});
		callback();
	});
}
var unlikeAnImage = function(id, guestToken, callback) {
	client(DB_URI, function(err, db) {
		if (err) {return callback(err);}
		db.collection('images').update({'id':id}, {
			$inc: {
				likes: -1
			},
			$pull: {
				likelog: {'token': guestToken}
			}
		});
		callback();
	});
}

var validateUser = function(username, hashed_pwd, guestToken, callback) {
	client(DB_URI, function(err, db) {
		if (err) {return callback(err);}
		var cur = db.collection('users').find({username: username, password: hashed_pwd});
		cur.toArray(function(err, userMatches) {
			console.log(userMatches);
			if (userMatches.length > 0) {
				db.collection('users').update(
					{_id: userMatches[0]._id},
					{$push: {tokens: guestToken}}
					);
				callback(true);
			}
			else {
				callback(false);
			}
		});
	});
}

var validateUserWithToken = function(guestToken, callback) {
	client(DB_URI, function(err, db) {
		if (err) {return callback(err);}
		var cur = db.collection('users').find({tokens: {$elemMatch:{$eq:guestToken}}});
		cur.toArray(function(err, userMatches){
			if (userMatches.length > 0) {
				callback(true);
			}
			else {
				callback(false);
			}
		});
	});
}

var exports = module.exports = {};

exports.getAllImages = getAllImages;
exports.likeAnImage = likeAnImage;
exports.insertAnImage = insertAnImage;
exports.unlikeAnImage = unlikeAnImage;
exports.validateUser = validateUser;
exports.validateUserWithToken = validateUserWithToken;
