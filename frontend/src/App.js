import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';


import { Login, UpdateUser, ViewUsers, CreateUser } from './pages/UserManagement';
import { CreateContract, ViewContracts, UpdateContract } from './pages/Contract';
import { TimesheetsInContract, Timesheet, ReviewTimesheet, MyTimesheetSummary } from './pages/Timesheet';

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
          <PrivateRoute path='/viewContracts' component={ViewContracts} />
          <PrivateRoute path='/createContract' component={CreateContract} />
          <PrivateRoute path='/updateContract/:id' component={UpdateContract} />
          <PrivateRoute path='/reviewTimesheet' component={ReviewTimesheet} />
          <PrivateRoute path='/myTimesheet' exact component={MyTimesheetSummary}></PrivateRoute>
          <PrivateRoute path='/myTimesheet/:id/:date' component={Timesheet} />
          <PrivateRoute path='/myTimesheet/:id' exact component={TimesheetsInContract} />
          <Redirect to='/404' />
        </Switch>
      </Layout>
    </div>

  );
}

export default App;
