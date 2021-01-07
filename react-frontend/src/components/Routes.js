import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

// Components
import Navbar from './Navbar';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Portfolio from './Portfolio';
import Upload from './Upload';
import NotFound from './NotFound';

// Context Provider
import { UserContext } from '../context/UserContext';

const Routes = () => {

  // Context State
  const [ user, setUser ] = useState(null);
  const [ navTitle, setNavTitle ] = useState('');

  // State
  const [ sidebarActive, setSidebarActive ] = useState(false);

  // value only changes if dependency array [...] changes (used with Context)
  const value = useMemo(() => ({ user, setUser, setNavTitle }), [user, setUser, setNavTitle]);

  // Adjusts sidebar visibility
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  // Verify token / get user credentials
  useEffect(() => {
    async function checkIfLoggedIn() {
      try {
        // withCredentials indicates whether or not cross-site Access-Control requests should be made using credentials
        // GET request to /session
        const response = await axios.get('http://localhost:5000/session',  { withCredentials: true });

        // Check if status is 200
        if (response.status === 200) {
          // Set user globally
          setUser(response.data); // { _id, owner (username), icon, avatar, biography }
        } else {
          console.log('Status: ', response.status);
        }
      } catch(error) {
        // User is not logged in / token or cookie expired
        setUser(null);
      }
    }
    checkIfLoggedIn();
  }, []);

  // TO-DO: restructure this based on whether user is logged in
  return (
    <BrowserRouter>
      <Navbar toggleSidebar={toggleSidebar} sidebarActive={sidebarActive} user={user} navTitle={navTitle} />
      <UserContext.Provider value={value}>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/posts' />
          </Route>
          <Route path='/posts/new' component={Upload} />
          <Route path='/posts' render={(props) => <Home {...props} setSidebarActive={setSidebarActive} sidebarActive={sidebarActive} />} />
          <Route path='/session/new' component={Login} />
          <Route path='/users/new' component={Signup} />
          <Route path='/users/:userid' component={Portfolio} />
          <Route component={NotFound} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default Routes;