import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';


import { Login, UpdateUser, ViewUsers, CreateUser } from './pages/UserManagement/index';
import { CreateContract, ViewContracts, UpdateContract } from './pages/Contract/index';

import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/' exact>HOME PAGE</Route>
          <PrivateRoute path='/viewUsers' component={ViewUsers} />
          <PrivateRoute path='/createUser' component={CreateUser} />
          <PrivateRoute path='/updateUser/:id' component={UpdateUser} />
          <PrivateRoute path='/viewContracts' component={ViewContracts}/>
          <PrivateRoute path='/createContract' component={CreateContract} />
          <PrivateRoute path='/updateContract/:id' component={UpdateContract} />
          <PrivateRoute path='/myTimesheet' >My Timesheet</PrivateRoute>
          <Redirect to='/404' />
        </Switch>
      </Layout>
    </div>

  );
}

export default App;
