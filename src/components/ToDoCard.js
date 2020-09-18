import React from 'react';
import ToDoList from '../components/ToDoList'

class ToDoCard extends React.Component {

    state = {
        input:'', 
    }

    handleListInput = (event) => {
        event.persist()
        this.setState({
            input: event.target.value
        });
        // console.log(event.target.value);
    }

    hanldeListSubmit = (event) => {
        event.preventDefault();
        console.log('A list was submitted');
        this.props.addList(this.props.card.id, this.state.input)
        this.setState({
            input:''
        });
    }

    renderLists(){
        // console.log(this.props.card); 
        if(this.props.card.lists){
            return this.props.card.lists.map(list => {  
                return <ToDoList key={list.id} cardId={this.props.card.id} list={list} toggleListStatus={this.props.toggleListStatus} />
            })  
        } 
    } 

    render(){            
        return (
            <div className="to-do-card">
                <div className="title"> {this.props.card.title} <h6>{this.props.theme}</h6></div>

                <div className="to-do-list">
                    {this.renderLists()}
                </div>

                <form onSubmit={this.hanldeListSubmit}>
                    <input type="text" className="to-do-card-input" onChange={this.handleListInput} value={this.state.input} />
                    {/* <input type="submit" value="+" className="to-do-card-input" /> */}
                </form>


            </div>  
        )   
    }           

}

export default ToDoCard;