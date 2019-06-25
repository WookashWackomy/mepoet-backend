const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
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

module.exports = mongoose.model('User',UserSchema);