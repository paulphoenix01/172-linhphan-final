var router = require('express').Router();
var user = require('./userModel');

// router.param, verfify user_id validity.
router.param('user_id', function (req,res,next){
	user.findOne({'_id': req.params.user_id}, 
		function(err, theUser){
			if(theUser){
				console.log("Found User: " + theUser);
				// Put the user_id and user in the req for faster access, and avoid some errors
				req.user_id = req.params.user_id;
				req.theUser = theUser;
				next();
			}else{
				// Put the user_id in the req for faster access
				req.user_id = req.params.user_id
				console.log("User not found: " + req.user_id );
				next();
			}
		}
	);
});
// Router.route for /api/users
router.route('/')
	.get(function(req, res){
		console.log("Here /api/users /GET");
		getUsers(res);
	})
	// Post function
	.post(function(req, res){
		console.log("Here /api/users /POST");

		// Problem here, can't parse req.body with body-parser or JSON.parse
		// console.log(">>>> Req.body: \n" + req.body);
	
		user.create({username: req.body.username, address: req.body.address}, function(err,user){
			if(err) res.send(err);
			console.log("Created new user: " + req.body.username);
			user.save(function(err){
				if(err) return res.send();
				res.json({message: 'New User Created!'});
			});
  		})
  	})
	// Error will be triggered if use /DELETE for /api/users
 	.delete(function(req,res,next){
		var err = new Error("Error Triggered");
		next(err);
 	})
;	

// Router.route for /api/users/:user_id
router.route('/:user_id')
	.get(function(req,res){
		console.log("Here /api/user/:user_id /GET");
		//Return theUser found with the user_id, or an empty one if theUser == null
		res.json(req.theUser || {});
	})
	// Delete a particular user with _id = user_id	
	.delete(function(req,res){
		user.remove({'_id': req.user_id},function(err){
			if(err) throw err;
		});
		// Return
		res.json({message: 'User deleted!'});
	})
	// Update the user info with new info.
	.put(function(req,res){
		user.findOne({'_id': req.user_id}, function (err, theUser){
			if(err) throw err;
			theUser.username = req.body.username;
			theUser.address = req.body.address;
		})
		// Return
		res.json({message: 'User Info Updated'});
	})
;

// Return json file of ALL users found in database
function getUsers(res){
	user.find(function(err,users){
		if(err) res.send(err);
		res.json(users||{});
	});
};
module.exports = router;
