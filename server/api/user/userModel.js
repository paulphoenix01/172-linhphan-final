var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  // Address type String, assuming optional (required = false by default)
	address:{
		type:String
	}
});

module.exports = mongoose.model('user', UserSchema);
