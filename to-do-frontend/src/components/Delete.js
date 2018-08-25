import React, { Component } from 'react';

class Delete extends Component{

    render() {
      const {list} = this.props
      const checkedItem = list.filter(item => item.complete === true)
        return (
          <button className="pull-right btn btn-danger" onClick={this.props.delete} disabled={checkedItem.length === 0}>Delete</button>
      )
    }
  }

export default Delete;