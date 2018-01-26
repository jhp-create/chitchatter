import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Chatroom from "./containers/Chatroom";
import HomeContainer from './containers/HomeContainer';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route 
            path="/chatroom" 
            render={(locationProps) => (
              <Chatroom {...locationProps} />
            )}
          />
          <Route 
            path="/" 
            render={(locationProps) => (
              <HomeContainer {...locationProps} />
            )}
          />
        </Switch>
      </div>  
    );
  }
}

export default App;
