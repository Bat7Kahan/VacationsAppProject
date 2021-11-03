import { Button } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routing from './Components/View/routing/routing';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </div>
  );
}

export default App;
