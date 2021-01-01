import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Posts from './Posts'

const Routes = () => {

  const [ sidebarActive, setSidebarActive ] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <BrowserRouter>
    <Navbar toggleSidebar={toggleSidebar} sidebarActive={sidebarActive} />
      <Switch>
        <Route exact path='/'>
          <Redirect to='/posts' />
        </Route>
        <Route path='/posts' render={(props) => <Posts {...props} toggleSidebar={toggleSidebar} sidebarActive={sidebarActive} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;