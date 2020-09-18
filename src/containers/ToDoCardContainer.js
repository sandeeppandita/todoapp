import React from 'react';
import ToDoCard from '../components/ToDoCard';
import { ThemeContext } from '../components/ThemeContext';

function ToDoCardContainer(props) { 
    
    function renderCards(){
        return props.cards.map( card => { 
            return <ToDoCard theme={props.theme} key={card.id} card={card} addList={props.addList} toggleListStatus={props.toggleListStatus} />;
        });  
    }

    return ( 
        <ThemeContext.Subscriber> 
            <div className="to-do-card-container">
                {renderCards()}
            </div> 
        </ThemeContext.Subscriber>
    )           

  }

  export default ToDoCardContainer;