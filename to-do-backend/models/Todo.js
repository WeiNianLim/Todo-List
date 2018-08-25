const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    content : String,
    complete : Boolean, 
    done : String
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
