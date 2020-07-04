import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { ViewUsers } from './pages/UserManagement/index';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path='/' exact>
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
      </Layout>
    </div>

  );
}

export default App;
