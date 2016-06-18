var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');  //need to import mongoose

var Post = mongoose.model('Post');  //need to get our models
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/posts', function(req, res, next){  //get all posts and return in json
  Post.find(function(err, posts){  //query all posts in the database
    if(err){return next(err);}  //first see if ther eis an error, if no, then...

    res.json(posts);  //bring back all the posts in json object for the client
  });
});


router.post('/posts', function(req, res, next){  //create new posts
  var post = new Post(req.body);  //we create a new post object, a new instance from ur model

  post.save(function(err, post){  //then we need to save it in the database
    if(err) {return next(err);}

    res.json(post);
  });
});


// all routes after will need an id in able to load all the post, thats what the param function will do for us
//it will automaticaly load the object for us
// this function will run first when in any route url is :post. this will contain an id
// its a middlewear function
router.param('post', function(req, res, next, id){
  var query = Post.findById(id);

  query.exec(function(err, post){
    if(err) {return next(err);}
    if(!post) {return next(new Error('cant find post'));}  //if post is not found

    req.post = post; //if post is found then assign it to post
    return next();
  });
});


// this is used below in the upvote on comment fnc
router.param('comment', function(req, res, next, id){
  var query = Comment.findById(id);  //use the comment model now from Comment model

  query.exec(function(err, comment){
    if(err) {return next(err);}
    if(!comment) {return next(new Error('cant find comment'));}  

    req.comment = comment; 
    return next();
  });
});


// route for returning a single post
// populate fnc will retrieve comments together with posts. it automaticaly loads all the comments with 
// that particular post
router.get('/posts/:post', function(req, res, next){  //the post object was retrieved using the param fnc...
  req.post.populate('comments', function(err, post){
    if(err) {return next(err);}

    res.json(post); //and was attached to req.body. so get back a single post with its comments
  });
});


// route for letting users upvote a single post. 
// first add a method for that in the posts schema in Posts
// then create the route:
// notice, we are using the param fnc again
router.put('/posts/:post/upvote', function(req, res, next){
  req.post.upvote(function(err, post){  //when come back with the post we then invoke the upvote fnc in Post.js
    if(err) {return next(err);}

    res.json(posts);
  });
});


// route for making comments on a particular post
router.post('/posts/:post/comments', function(req, res, next){
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err) {return next(err);}

    req.post.comments.push(comment);
    req.post.save(function(err, post){
      if(err) {return next(err);}

      res.json(comment);
    });
  });
});


// route for upvotes on comments on a specific post
// also need to make another req.param fnc but for comments bc we have the comments model
// remember to also add an upvote method for comments in Comments.js
router.put('/posts/:post/comments/:comment/upvote', function(req, res, next){
  req.comment.upvote(function(err, comment){
    if(err) {return next(err);}

    res.json(comment);
  });
});










module.exports = router;
