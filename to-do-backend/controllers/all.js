const Todo = require('../models/Todo');

const TodoController = {
    getTodo:(filter) => {
        if (filter === "active") {
            return new Promise((resolve, reject) => {
                Todo.find({})
                    .where("complete").equals("false")
                    .exec()
                    .then(todoList => {
                        resolve(todoList);
                    })
            })
        } else if (filter === "complete") {
            return new Promise((resolve, reject) => {
                Todo.find({})
                    .where("complete").equals("true")
                    .exec()
                    .then(todoList => {
                        resolve(todoList);
                    })
            })
        } else if (filter === "all") {
            return new Promise((resolve, reject) => {
                Todo.find({})
                    .then(todoList => {
                        resolve(todoList);
                    })
            })
        } else if (filter === "allTodoNum") {
            return new Promise((resolve, reject) => {
                Todo.countDocuments({})
                    .then(num => {
                        resolve(num);
                    })
            })
        } else if (filter === "activeTodoNum") {
            return new Promise((resolve, reject) => {
                Todo.countDocuments({complete : false})
                    .then(num => {
                        resolve(num);
                    })
            })
        } else if (filter === "completeTodoNum") {
            return new Promise((resolve, reject) => {
                Todo.countDocuments({complete : true})
                    .then(num => {
                        resolve(num);
                    })
            })
        }
    },

    addTodo : (content, complete, done) => {
        return new Promise((resolve, reject) => {
            Todo({
                    content,
                    complete,
                    done
                })
                .save()
                .then(todo => {
                    resolve(todo);
                })
        })
    },

    updateTodo : (_id, complete, done) => {
        return new Promise((resolve, reject) =>{
            Todo.findOneAndUpdate(
                {"_id": _id}, 
                {
                    complete : complete, 
                    done : done
                }, {
                    new:true,
                    runValidators:true
                })
                .then(updatedTodo => {
                    resolve(updatedTodo)
                })
        })
    },

    deleteTodo : () => {
        return new Promise((resolve, reject) => {
            Todo.deleteMany({
                    complete : true
                })
                .then(deletedTodo => {
                    resolve(deletedTodo)
                })
        })
    }
}

module.exports = TodoController
