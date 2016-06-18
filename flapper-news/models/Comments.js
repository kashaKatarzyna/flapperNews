var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  upvotes: {type: Number, default: 0},
  post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});

CommentSchema.methods.upvote = function(cb){
  this.upvotes ++;
  this.save(cb);
};

mongoose.model('Comment', CommentSchema);

// ObjectId type allows for creating a relationship btw different mongoose models. its a default object thats 
// stored in the database. the ref property tells mongoose what type of object the id references and lets us get 
// both items the same time