
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", { useNewUrlParser: true });

var Post = require("./models/post.js");  // ./ references current folder
var User = require("./models/user.js");

//------------------------------------------------- DATA
// referemcomg data. rather than embedding it...





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
    title: "cheeses vol. 1",
    content: "cheddar and swiss"
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


// find user
// and find all posts for that user
User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(error, user){
    if(error){
        console.log(error);
    }else{
        console.log(user); // this now shows full posts attributes, not just an ID
    }
});

