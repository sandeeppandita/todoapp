import React from 'react';

class ToDoList extends React.Component {

    state = {
        input: ""
    }

    handleClick = (event) => {
      event.preventDefault(); 
      console.log('clicked list');
      this.props.toggleListStatus(this.props.cardId, this.props.list.id);
    } 

    render() {                        
      return ( 
          <div className="to-do-list-item" onClick={this.handleClick}>
            <span className={this.props.list.completed ? 'list-item-complete' : 'list-item-incomplete'}> {this.props.list.description} </span>
          </div>
      );   
    }   

  }

  export default ToDoList;