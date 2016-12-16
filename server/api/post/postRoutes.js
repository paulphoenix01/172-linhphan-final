var router = require('express').Router();
var post = require('./postModel');

// Router.param middleware for verify post_id validity
router.param('post_id', function(req, res, next){
	post.findOne({'_id': req.params.post_id},
		function(err,thePost){
			if(thePost){	// Found post
				// Put post_id and thePost in req for easier access, avoid some errors
				req.post_id = req.params.post_id;
				req.thePost = thePost;
				next();
			}else{		// Post not found
				req.post_id = req.params.post_id;
				next();
			}
		})
});

// Route for /api/posts
router.route('/')
	.get(function(req,res){
		// Return all posts
		getPosts(res);
	})
	// Create posts with title,text,author,categories as the req.body file received
	.post(function(req,res){
		post.create({
			title: req.body.title,
			text: req.body.text,
			author: req.body.author,
			categories: req.body.categories
		},function(err, thePost){
			if(err) res.send(err);
			// Save changes to database
			post.save(function(err){
				if(err) return res.send();
				res.json({message:"New Post Created"});
			});
		})
	});

// Route for /api/posts/:post_id
router.route('/:post_id')
	.get(function(req,res){
		// Return thePost if found, {} if null
		res.json(req.thePost||{});
	})
	// Delete a particular post with _id = post_id
	.delete(function(req,res){
		post.remove({'_id': req.post_id}, function(err){
				if(err) throw err;
		});
	})
	// Update a post (_id = post_id), with all value as in the received json req.body
	.put(function(req,res){
		post.findOne({'_id':req.post_id}, function(err,thePost){
			if(err) throw err;
			thePost.title = req.body.title;
			thePost.text = req.body.text;
			thePost.author = req.body.author;
			thePost.categories = req.body.categories;
		})
	});

// Return ALL posts found in the database
function getPosts(res){
	post.find(function(err,posts){
		if(err) res.send(err);
		res.json(posts|| {} );
	})
};



module.exports = router;
