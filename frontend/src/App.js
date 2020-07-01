import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { ViewUsers } from './pages/UserManagement/index';


function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Switch>
        <Route path='/'>
            <ViewUsers></ViewUsers>
          </Route>
          <Route path='/viewusers'>
            <ViewUsers></ViewUsers>
          </Route>
          {/* to be updated */}
          <Route path='/addusers'>
            <ViewUsers></ViewUsers>
          </Route>
          <Route path='/updateusers'>
            <ViewUsers></ViewUsers>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
