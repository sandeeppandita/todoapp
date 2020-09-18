import React from 'react';

class CreateCard extends React.Component {

    state = {
        input: ""
    }

    handleInput = (event) => {
        event.persist()
        this.setState({
          input: event.target.value
        })

        // console.log(this.state.input);
    } 

    handleNewCard = (event) => {
      event.preventDefault();
      console.log('A name was submitted');
      this.props.createNewCard(this.state.input);     
    } 

    render() {                       
      return ( 
        <form onSubmit={this.handleNewCard} className="new-card-form">
            <h4>Create New Card</h4>
            <input className="new-card-input" type="text" onChange={this.handleInput} value={this.state.input} />
            <input className="new-card-input" type="submit" value="Create" />
        </form>
      );   
    }  

  }

  export default CreateCard;