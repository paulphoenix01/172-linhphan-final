var router = require('express').Router();

// api router will mount other routers
// for all our resources

//This is the initial API Endpoint 
router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});
router.use('/users', require('./user/userRoutes'));
//Root route for posts and category
router.use('/posts', require('./post/postRoutes'));
router.use('/category', require('./category/categoryRoutes'));

 
module.exports = router;
