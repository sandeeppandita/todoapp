import React from 'react';
import MainContainer from './MainContainer';
import Nav from './Nav';
import '../App.css'; 


class App extends React.Component {

  handleClick = async () => {

    let Module = await import('../components/ThemeContext');
    console.log(Module.Module1);
    console.log(Module.Module2);  
    // .then( ({Module1}) => { 
    //   console.log(Module1);
    // }).catch(err => {
    //   console.log(err);
    // })

    // console.log('Hi... ' + Module1 + Module2);

  }     
 
  render() {  
    return (
      <div className="wrapper">

          {/* <button onClick={this.handleClick}>Load</button> */}

          <Nav />

          <MainContainer />
      </div>                       
    )
  } 

} 

export default App;
