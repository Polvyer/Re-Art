import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Content from './Content';
import Register from './Register';
import { UserContext } from '../context/UserContext';

const Routes = () => {

  const [ user, setUser ] = useState(false); // GET USER INFO FROM DB SOMEHOW

  const [ sidebarActive, setSidebarActive ] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <BrowserRouter>
    <Navbar toggleSidebar={toggleSidebar} sidebarActive={sidebarActive} user={user} />
      <Switch>
        <UserContext.Provider value={{ user, setUser }}>
          <Route exact path='/'>
            <Redirect to='/posts' />
          </Route>
          <Route path='/posts' render={(props) => <Content {...props} toggleSidebar={toggleSidebar} sidebarActive={sidebarActive} />} />
          <Route path='/users/new' component={Register} />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;