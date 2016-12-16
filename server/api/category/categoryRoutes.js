// Category Routes file
var router = require('express').Router();
var category = require('./categoryModel');

// Router.param middleware for checking category_id validity
router.param('category_id', function(req, res, next){
	category.findOne({'_id': req.params.category_id},
		function(err,theCate){
			if(theCate){	// Found post
				// Put _id in the req for easier access and avoid some erros
				req.category_id = req.params.category_id;
				req.theCate = theCate;
				next();
			}else{		// Post not found
				req.category_id = req.params.category_id;
				next();
			}
		})
});

// Route /api/categories/
router.route('/')
	.get(function(req,res){
		// Return all found categories
		getCategories(res);
	})
	// Create a new category with name = req.body.name
	.post(function(req,res){
		category.create({
			name: req.body.name,
		},function(err, theCate){
			if(err) res.send(err);
			// Save change to db
			category.save(function(err){
				if(err) return res.send();
				res.json({message:"New Category Created"});
			});
		})
	});

// Route /api/categories/:category_id
router.route('/:category_id')
	.get(function(req,res){
		res.json(req.theCate||{});
	})
	// Delete category with _id = req.category_id
	.delete(function(req,res){
		post.remove({'_id': req.category_id}, function(err){
				if(err) throw err;
		});
	})
	// Update a category with the name found n req.body.name
	.put(function(req,res){
		post.findOne({'_id':req.category_id}, function(err,theCate){
			if(err) throw err;
			theCate.name = req.body.name;
		})
	});

// Return all found categories in the database
function getCategories(res){
	category.find(function(err,categories){
		if(err) res.send(err);
		res.json(posts|| {} );
	})
};


module.exports = router;
