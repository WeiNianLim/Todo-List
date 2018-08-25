import React, { Component } from 'react';
import shortid from 'shortid';

class TodoList extends Component {

    render(){
        const {list} = this.props
        const listItem = list.map((item) => {
        return <li key={shortid.generate()} className="list-group-item">
                <input type="checkbox" value={item.content} onChange={() => {this.props.isChecked(item._id, item.complete ? false : true, item.done === "" ? "done" : "")}} checked={item.complete}/>
                <label className={item.done} >{item.content}</label>
                </li>
        })
        return (
        <ul className="list-group">{listItem}</ul>
        )
    }
}

export default TodoList;
