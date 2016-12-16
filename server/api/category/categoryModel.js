// Category Model file
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name: {
		type:String,
		require: true,
		unique: true}
	});

module.exports = mongoose.model('category', CategorySchema);
