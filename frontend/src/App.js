import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';


import { Login, UpdateUser, ViewUsers, CreateUser } from './pages/UserManagement/index';
import { CreateContract } from './pages/Contract/index';

import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path='/login' exact component={Login} />
          <PrivateRoute path='/viewUsers' component={ViewUsers} />
          <PrivateRoute path='/createUser' component={CreateUser} />
          <PrivateRoute path='/updateUser' component={UpdateUser} />
          <PrivateRoute path='/createContract' component={CreateContract} />
          <Redirect to='/login' />
        </Switch>
      </Layout>
    </div>

  );
}

export default App;
