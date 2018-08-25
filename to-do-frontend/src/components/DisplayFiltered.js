import React, { Component } from 'react';
import shortid from 'shortid';

class DisplayFiltered extends Component{
    filterOption = (e) => {
      const {value} = e.target
      this.props.filterOption(value)
    }
  
    render(){
      const {filterOptionList, allTodoNum, activeTodoNum, completeTodoNum} = this.props
      const filterOptionListItem = filterOptionList.map((item) => {
        return <option key={shortid.generate()} value={item.option} selected={item.selected}>{item.option}  ({item.option === "all" ? allTodoNum : item.option === "active" ? activeTodoNum : completeTodoNum})</option>
      })
      return (
        <select onChange={this.filterOption}>{filterOptionListItem}</select>//
      )
    }
  }
  
  export default DisplayFiltered;