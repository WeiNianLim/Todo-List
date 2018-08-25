import React, { Component } from 'react';

class AddTodo extends Component{
    addTodo = (e) => {
      e.preventDefault()
      const form = e.target
      const {content} = form
      
      if (content.value === '')
        form.placeholder = "Cannot be empty"
      else
        this.props.addTodo(content.value)
      content.value = ''
    }
    render(){
      const {disabled} = this.props
      return (
        <form onSubmit={this.addTodo}>
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn btn-primary" type="submit" disabled={disabled}>Add</button>
            </span>
            <input className="form-control" placeholder={disabled ? "Cannot add to do at complete section":"add a todo"} name="content"  disabled={disabled}/>
          </div>
        </form>
      )
    }
  }

export default AddTodo;
