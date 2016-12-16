var router = require('express').Router();

// setup boilerplate route jsut to satisfy a request
// for building

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.
router.route('/')
  .get(function(req, res){
    console.log('Hey from user!!');
    res.send({ok: true});
  })
// Error will be triggered if use /DELETE for /api/users
  .delete(function(req,res,next){
	var err = new Error("Error Triggered");
	next(err);
  })
;	

module.exports = router;
