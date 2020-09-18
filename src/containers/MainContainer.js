import React from 'react';
import CreateCard from '../components/CreateCard';
import ToDoCardContainer from '../containers/ToDoCardContainer';
import { ThemeContext } from '../components/ThemeContext';

class MainContainer extends React.Component {

    state = {                
      cards: [],
    } 
    
    componentDidMount(){
      fetch("https://5f316665373bc7001635f9ea.mockapi.io/todoapp/v1/todos")
      .then(resp => resp.json())  
      .then(cards => {

        fetch("https://5f316665373bc7001635f9ea.mockapi.io/todoapp/v1/lists")
        .then(resp => resp.json())
        .then(lists => {

          let cardsWithList = cards.map( (card) => {
            card.lists = lists.filter( (list) => {
                return list.cart_id === card.id;
            });
            return card;
          });  

          this.setState({   
            cards: cardsWithList 
          }) 
          
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
          completed: false,
          lists:[]
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
          completed: false 
        })  
      }) 
      .then(resp => resp.json())
      .then(newList => {
        console.log('added new list');

        const foundCard = {...this.state.cards.find(function(card){
          return card.id === cardId;
        })};
 
        // foundCard.lists.push(newList);  
        foundCard.lists = [...foundCard.lists, newList];

        let newCards = this.state.cards.map(function(card){
          if(card.id === cardId){
            return foundCard;
          }else{
            return card;
          }
        });  

        this.setState({
          cards : newCards
        });

        // console.log(foundCard); 
        // console.log(this.state.cards);
      })
    }  

    toggleListStatus = (cardId, listId) => {
      console.log(cardId +'-'+  listId); 

      let foundCard = this.state.cards.find( (card) => {
        return card.id === cardId;
      });

      let foundList = foundCard.lists.find( (list) => {
        return list.id === listId;
      });

      let toggleState = null;
      if(foundList.completed){
        toggleState = false;
      }else{
        toggleState = true;
      }
      
      fetch("https://5f316665373bc7001635f9ea.mockapi.io/todoapp/v1/lists/" + listId, {
        method: "PUT",
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },  
        body: JSON.stringify({   
          completed: toggleState 
        })  
      }) 
      .then(resp => resp.json())
      .then(newList => {
        console.log('new list added');
        let newLists = foundCard.lists.map( (list)=> {
           if(list.id === listId){
             return newList;
           }else{
             return list;
           }
        });

        foundCard.lists = newLists;

        let newCards = this.state.cards.map( (card) => {
          if(card.id === cardId){
            return foundCard;
          }else{
            return card;
          }
        });

        this.setState({
          cards: newCards
        })

      });
    }

    render() { 
      const data = {
        theme: 'dark',
      }; 

      return ( 
        <div className="main-container"> 
          <CreateCard createNewCard={this.createNewCard} /> 
          <ThemeContext.Provider value={data}>
            <ToDoCardContainer theme={this.state.theme} cards={this.state.cards} addList={this.addList} toggleListStatus={this.toggleListStatus} /> 
          </ThemeContext.Provider>
        </div>    
      );            
    }

}

export default MainContainer
export { ThemeContext }