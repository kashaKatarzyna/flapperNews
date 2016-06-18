var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({  //this is how we want our post to look like
  title: String,
  link: String,
  upvotes: {type: Number, default:0},  //
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}] //this way we can easily get all the comments for given post
});

mongoose.model('Post', PostSchema);

// make sure to register this model in app.js so it can be used with the database