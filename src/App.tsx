import React, {useState} from 'react';
import './App.css';
import Header from './header'

function App() {

  const counter = useState(0);

 

  function handleButtonClick(){
      counter += 1;
      console.log(counter)
  }

  return (
       
     <div>

    <Header title="Hello World"/>
    
          <h1>{counter}</h1>

          <button type="button" onClick={handleButtonClick}>Aumentar</button>
       
     </div>
   
  );
}

export default App;
