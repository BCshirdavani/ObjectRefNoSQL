
var mongoose = require("mongoose");

// user - email, name  ---- this comes after post is defined, because we embed that here
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});
var User = mongoose.model("User", userSchema);
module.exports = User;
