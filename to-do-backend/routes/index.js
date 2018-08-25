const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo');
const TodoController = require('../controllers/all')

router.get('/:filter', (req, res) => {
    const {filter} = req.params
    TodoController
        .getTodo(filter)
        .then(todoList => {
            res.json(todoList);
        })
})

router.post('/', (req,res) => {
    const {content, complete, done} = req.body
    TodoController
        .addTodo(content, complete, done)
        .then(addedTodo => {
            res.json(addedTodo);
        })
})

router.put('/', (req, res) => {
    const {_id, complete, done} = req.body
    TodoController
        .updateTodo(_id, complete, done)
        .then(updatedTodo => {
            res.json(updatedTodo)
        })
})

router.delete('/', (req, res) => {
    TodoController
        .deleteTodo()
        .then(deletedTodo => {
            res.json(deletedTodo)
        })
})
module.exports = router