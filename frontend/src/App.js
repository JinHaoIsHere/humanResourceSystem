import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

<<<<<<< HEAD
import { ViewUsers, Login, CreateUser } from './pages/UserManagement/index';
=======
import { AddUser, UpdateUser, ViewUsers, Login } from './pages/UserManagement/index';
>>>>>>> c58983b405af17e8d7bee0194583cd3d07efad18
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/viewUsers' component={ViewUsers}>
          </Route>
<<<<<<< HEAD
          <Route path='/createUser' component={CreateUser}>
=======
          <Route path='/addUser' component={AddUser}>
>>>>>>> c58983b405af17e8d7bee0194583cd3d07efad18
          </Route>
          <Route path='/updateUser' component={UpdateUser}>
          </Route>
        </Switch>
      </Layout>
    </div>

  );
}

export default App;
