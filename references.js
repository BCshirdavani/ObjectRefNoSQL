
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", { useNewUrlParser: true });

//------------------------------------------------- DATA
// referemcomg data. rather than embedding it...

// post - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);


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

// User.create({
//   email: "bob@gmail.com",
//   name: "Robert Belcher"
// });

// Post.create({
//     title: "How to coook the best burger",
//     content: "blah blah blah blah meh"
// }, function(error, post){
//     console.log("posting: ", post);
// });


// connect the post and user
Post.create({
    title: "other book",
    content: "2972349582749805724"
}, function(error, post){
    // find a user to associate this with
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            // push this post into that users post array
            foundUser.posts.push(post);
            // save the user
            foundUser.save(function(error, data){
                if(error){
                    console.log(error);
                }else{
                    console.log("data connected: ", data);
                }
            });
        }
    });
});

