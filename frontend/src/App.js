import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';



import { Login, UpdateUser, ViewUsers, CreateUser } from './pages/UserManagement/index';
import { CreateContract } from './pages/Contract/index';

import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/viewUsers' component={ViewUsers} />
          <Route path='/createUser' component={CreateUser} />
          <Route path='/updateUser' component={UpdateUser} />
          <Route path='/createContract' component={CreateContract} />
        </Switch>
      </Layout>
    </div>

  );
}

export default App;
