import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import { ViewUsers } from './pages/UserManagement/index';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path='/' exact>
            Landing
          </Route>
          <Route path='/viewUsers' component={ViewUsers}>
          </Route>
          {/* to be updated */}
          <Route path='/addUser'>
            Adding Users
          </Route>
          <Route path='/updateUser'>
            Update Users
          </Route>
        </Switch>
      </Layout>
    </div>

  );
}

export default App;
