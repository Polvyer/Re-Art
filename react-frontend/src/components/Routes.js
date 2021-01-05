import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

// Components
import Navbar from './Navbar';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Portfolio from './Portfolio';

// Context Provider
import { UserContext } from '../context/UserContext';

const Routes = () => {

  // Context State
  const [ user, setUser ] = useState(null);

  // State
  const [ navTitle, setNavTitle ] = useState('');
  const [ sidebarActive, setSidebarActive ] = useState(false);

  // value only changes if dependency array [...] changes (used with Context)
  const value = useMemo(() => ({ user, setUser, setNavTitle }), [user, setUser, setNavTitle]);

  // Adjusts sidebar visibility
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  // GET request to /session (to verify token)
  useEffect(() => {
    async function checkIfLoggedIn() {
      try {
        // withCredentials indicates whether or not cross-site Access-Control requests should be made using credentials
        const response = await axios.get('http://localhost:5000/session',  { withCredentials: true });

        if (response.status === 200) {
          // Set user globally
          setUser(response.data);
        }
      } catch(error) {
        // User is not logged in / token or cookie expired
        setUser(null);
      }
    }
    checkIfLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <Navbar toggleSidebar={toggleSidebar} sidebarActive={sidebarActive} user={user} navTitle={navTitle} />
      <UserContext.Provider value={value}>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/posts' />
          </Route>
          <Route path='/posts' render={(props) => <Home {...props} setSidebarActive={setSidebarActive} sidebarActive={sidebarActive} />} />
          <Route path='/session/new' component={Login} />
          <Route path='/users/new' component={Signup} />
          <Route path='/users/:userid' component={Portfolio} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default Routes;