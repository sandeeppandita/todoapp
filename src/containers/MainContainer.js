import React from 'react';
import CreateCard from '../components/CreateCard'
import ToDoCardContainer from '../containers/ToDoCardContainer'

class MainContainer extends React.Component {

    state = {
      cards: [] 
    }

    componentDidMount(){
      fetch("https://5f316665373bc7001635f9ea.mockapi.io/todoapp/v1/todos")
      .then( 
        resp => resp.json() 
      )  
      .then(cards => {
        this.setState({
          cards: cards 
        })  
      })
    } 

    createNewCard = (input) => {
      console.log('creating new card');
      fetch("https://5f316665373bc7001635f9ea.mockapi.io/todoapp/v1/todos", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },  
        body: JSON.stringify({      
          title: input, 
          completed: 'false' 
          // createdAt: 1  
        })
      }) 
      .then(resp => resp.json())
      .then(newCard => {
        console.log('created new card');
        this.setState({
          cards: [...this.state.cards, newCard]
        })
      })
    }  
    
    addList = (cardId, ListItem) => {
      console.log(cardId + '-' + ListItem);
      fetch("https://5f316665373bc7001635f9ea.mockapi.io/todoapp/v1/lists", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },  
        body: JSON.stringify({   
          cart_id: cardId, 
          description: ListItem, 
          completed: 'false' 
        })  
      }) 
      .then(resp => resp.json())
      .then(newList => {
        console.log('added new list');

        const foundCard = {...this.state.cards.find(function(card){
          return card.id === cardId;
        })};

        foundCard.lists = [];   
        foundCard.lists = [...foundCard.lists, newList];

        console.log(foundCard);
        // this.setState({
        //   cards: [...this.state.cards, newCard]
        // })

      })
    }  

    render() {   
      return ( 
        <div className="main-container">
          <CreateCard createNewCard={this.createNewCard} />
          <ToDoCardContainer cards={this.state.cards} addList={this.addList} /> 
        </div> 
      );            
    }

}

export default MainContainer;