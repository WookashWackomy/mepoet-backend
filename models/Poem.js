const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PoemSchema = new Schema({
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

module.exports = mongoose.model('Poem',PoemSchema);