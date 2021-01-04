import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

// Components
import Navbar from './Navbar';
import Content from './Content';
import Signup from './Signup';
import Login from './Login';
import Portfolio from './Portfolio';

// Context Provider
import { UserContext } from '../context/UserContext';

const Routes = () => {

  const [ user, setUser ] = useState(null);

  const [ navTitle, setNavTitle ] = useState('');
  const [ sidebarActive, setSidebarActive ] = useState(false);

  const value = useMemo(() => ({ user, setUser, setNavTitle }), [user, setUser, setNavTitle]);

  // Adjusts sidebar visibility
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  useEffect(() => {
    async function checkIfLoggedIn() {
      try {
        // withCredentials indicates whether or not cross-site Access-Control requests should be made using credentials
        const response = await axios.get('http://localhost:5000/session',  { withCredentials: true });
        console.log(response);
      } catch(error) {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      }
    }
    checkIfLoggedIn();
  }, [])

  return (
    <BrowserRouter>
      <Navbar toggleSidebar={toggleSidebar} sidebarActive={sidebarActive} user={user} navTitle={navTitle} />
      <UserContext.Provider value={value}>
        <Switch>
            <Route exact path='/'>
              <Redirect to='/posts' />
            </Route>
            <Route path='/posts' render={(props) => <Content {...props} setSidebarActive={setSidebarActive} toggleSidebar={toggleSidebar} sidebarActive={sidebarActive} />} />
            <Route path='/session/new' component={Login} />
            <Route path='/users/new' component={Signup} />
            <Route path='/users/:userid' component={Portfolio} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default Routes;