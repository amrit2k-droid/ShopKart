import React, { Component } from 'react';
import Home from './components/Home/Home';
import WelcomePage from './components/Welcome/WelcomePage/WelcomePage';
import { BrowserRouter } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Home />
         {/*  <WelcomePage /> */}
        </div>
      </BrowserRouter>
    )
  }
}

export default App