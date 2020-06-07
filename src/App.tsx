import React, {useState} from 'react';
import './App.css';
import Header from './header'
import Home from './pages/Home'

function App() {
  const [counter, setCounter] = useState(0);

 

  function handleButtonClick(){
     setCounter( counter + 1)
      console.log(counter)
  }

  return (
       
     <div>

   <Home/>
       
     </div>
   
  );
}

export default App;
