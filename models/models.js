var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: String,
  description: String,
  image: String,
  image_id: String,
  created_at: Date
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
