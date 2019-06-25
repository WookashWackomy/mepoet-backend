const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    poems: {
        type: [String]
    },
    liked: {
        type: [String]
    }
});

let poemSchema = new Schema({
    author:{
        type: String
    },
    title: {
        type: String
    },
    body: {
        type: String
    }
});

var User = mongoose.model('User',userSchema)
var Poem = mongoose.model('Poem',poemSchema)

module.exports = {
    User: User,
    Poem: Poem
}