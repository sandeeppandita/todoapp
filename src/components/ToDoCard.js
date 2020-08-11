import React from 'react';

class ToDoCard extends React.Component {

    state = {
        input:''
    }

    handleListInput = (event) => {
        event.persist()
        this.setState({
            input: event.target.value
        });
        console.log(event.target.value);
    }

    hanldeListSubmit = (event) => {
        event.preventDefault();
        console.log('A list was submitted');
        this.props.addList(this.props.card.id, this.state.input)
        this.setState({
            input:''
        });
    }

    render(){            
        return (
            <div className="to-do-card">
                <div className="title"> {this.props.card.title} </div>
                <form onSubmit={this.hanldeListSubmit}>
                    <input type="text" className="to-do-card-input" onChange={this.handleListInput} value={this.state.input} />
                    {/* <input type="submit" value="+" className="to-do-card-input" /> */}
                </form>
            </div>  
        )   
    }           

}

export default ToDoCard;