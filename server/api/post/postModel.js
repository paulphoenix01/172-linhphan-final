var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  text: {
    type: String,
    required: true
  },
  // reference to the user who created this post
  author: 
   {type: Schema.Types.ObjectId,
         ref: 'user',
         required:true
   },
  // reference to categories, as an array of object id
  // Assuming, category is optional
	categories:
	[{
	category:
		{type: Schema.Types.ObjectId,
		ref:'category'}
	}]	

});

module.exports = mongoose.model('post', PostSchema);
