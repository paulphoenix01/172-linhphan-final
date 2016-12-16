// Category Routes file
var router = require('express').Router();

router.route('/')
	.get(function(req,res){
		console.log("Here is Category");
		res.send({ok:true});
	});

module.exports = router;
