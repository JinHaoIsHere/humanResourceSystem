import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';


import { CreateUser } from './pages/UserManagement/index';

import {  UpdateUser, ViewUsers, Login } from './pages/UserManagement/index';

import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/viewUsers' component={ViewUsers}>
          </Route>
          <Route path='/createUser' component={CreateUser}></Route>
          {/* <Route path='/addUser' component={AddUser}>
          </Route> */}
          <Route path='/updateUser' component={UpdateUser}>
          </Route>
        </Switch>
      </Layout>
    </div>

  );
}

export default App;
