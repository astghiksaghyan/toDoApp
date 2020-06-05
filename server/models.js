const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Todo', Todo);