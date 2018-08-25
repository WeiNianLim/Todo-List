import React, { Component } from 'react';
import './App.css';
import AddTodo from '../AddTodo'
import TodoList from '../TodoList'
import DisplayFiltered from '../DisplayFiltered'
import Delete from '../Delete'
import axios from 'axios'

class App extends Component {

  constructor(props){
    super(props)
    this.state = { 
      todoList : [],
      filterOptionList : [{
                      option : "all",
                      selected : "selected"
                    },{
                      option : "active",
                      selected : ""
                    },{
                      option : "complete",
                      selected : ""
                    }],
      inputdisabled : false,
      allTodoNum : 0,
      activeTodoNum : 0,
      completeTodoNum : 0
    }
  }

  componentDidMount(){
    const todos = localStorage.getItem("TODOS")
    if(todos){
      this.setState({
        TodoList
      })
    }
    axios.get('http://localhost:8080/all')
      .then((todoList) => {
        this.setState({
          todoList : todoList.data
        })
      })
      this.keepTrackOfToDoList()
  }

  componentDidUpdate(){
    localStorage.setItem("TODOS", JSON.stringify(this.state.todoList))
  }

  addTodo = (value) => {
    axios.post('http://localhost:8080/',{
        content : value, 
        complete : false,
        done : ""
      })
      .then(todo => {
        this.setState({
          todoList: [...this.state.todoList, todo.data]
        })
        this.keepTrackOfToDoList()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  isChecked = (_id, complete, done) => {

    let getOption = ""
    for (let i = 0 ; i < this.state.filterOptionList.length ; i++){
      if (this.state.filterOptionList[i].selected === "selected"){
        getOption = this.state.filterOptionList[i].option
        break
      }
    }
        
    axios.put('http://localhost:8080/',{
        _id, 
        complete,
        done
      })
      .then(updatedTodo => {
        axios.get(`http://localhost:8080/${getOption}`)
          .then((todoList) => {
            this.setState({
              todoList : todoList.data
            })
            this.keepTrackOfToDoList()
          })
      })
      .catch((err) => {
        console.log(err)
      })
    
  }
  
  filterOption = (option) => {

    const newfilterOptionList = this.state.filterOptionList.map(list => {
      list.selected = list.option === option ? "selected" : ""
      return list
    })

    if (option === "all"){
      axios.get(`http://localhost:8080/${option}`)
        .then((todoList) => {
          this.setState({
            filterOptionList : newfilterOptionList,
            inputdisabled : false,
            todoList : todoList.data
            
          })
          this.keepTrackOfToDoList()
      })
    } else if (option === "active"){
      axios.get(`http://localhost:8080/${option}`)
        .then((todoList) => {
          this.setState({
            filterOptionList : newfilterOptionList,
            inputdisabled : false,
            todoList : todoList.data
          })
          this.keepTrackOfToDoList()
        })
    } else {
      axios.get(`http://localhost:8080/${option}`)
        .then((todoList) => {
          this.setState({
            filterOptionList : newfilterOptionList,
            inputdisabled : true,
            todoList : todoList.data
          })
          this.keepTrackOfToDoList()
        })
    } 
  }

  delete = () => {
    let getOption = ""
    for (let i = 0 ; i < this.state.filterOptionList.length ; i++){
      if (this.state.filterOptionList[i].selected === "selected"){
        getOption = this.state.filterOptionList[i].option
        break
      }
    }
    axios.delete('http://localhost:8080/')
      .then(deletedTodo => {
        axios.get(`http://localhost:8080/${getOption}`)
          .then((todoList) => {
            this.setState({
              todoList : todoList.data
            })
            this.keepTrackOfToDoList()
          })
      })
  }

  keepTrackOfToDoList(){
    axios.get(`http://localhost:8080/allTodoNum`)
      .then(num => {
        this.setState({
          allTodoNum : num.data
        })
      })

    axios.get(`http://localhost:8080/activeTodoNum`)
      .then(num => {
        this.setState({
          activeTodoNum : num.data
        })
      })

    axios.get(`http://localhost:8080/completeTodoNum`)
      .then(num => {
        this.setState({
          completeTodoNum : num.data
        })
      })
  }

  render() {

    return (
      <div className="container">
        <h1 className="text-center">todos</h1>
        <AddTodo addTodo={this.addTodo} disabled={this.state.inputdisabled}/>
        <TodoList list={this.state.todoList} isChecked={this.isChecked}/>
        <DisplayFiltered filterOptionList={this.state.filterOptionList} filterOption={this.filterOption} 
          activeTodoNum={this.state.activeTodoNum} allTodoNum={this.state.allTodoNum} completeTodoNum={this.state.completeTodoNum}/>
        <Delete list={this.state.todoList} delete={this.delete}/>
      </div> 
    );
    
  }
}

export default App;
