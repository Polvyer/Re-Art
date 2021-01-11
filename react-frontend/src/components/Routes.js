import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

// Components
import Navbar from './Navbar';
import Home from './Home';
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import Portfolio from './Portfolio';
import Upload from './Upload';
import NotFound from './NotFound';
import LogoutModal from './LogoutModal';

// Context Provider
import { UserContext } from '../context/UserContext';

const Routes = () => {

  // Context State
  const [ user, setUser ] = useState(null);
  const [ navTitle, setNavTitle ] = useState('');

  // State
  const [ sidebarActive, setSidebarActive ] = useState(false);
  const [ showLogoutModal, setShowLogoutModal ] = useState(false);

  // value only changes if dependency array [...] changes (used with Context)
  const value = useMemo(() => ({ user, setUser, setNavTitle }), [user, setUser, setNavTitle]);

  // Adjusts sidebar visibility
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  // Expire the 'token' cookie (since we can't expire jwt tokens on demand)
  const logout = async (e) => {
    try {
      // DELETE request to /session
      const response = await axios.delete('http://localhost:5000/session',  { withCredentials: true });
      
      if (response.status === 200) {
        // Hide logout modal
        setShowLogoutModal(false);

        // Set user to null
        setUser(null);

        // Redirect to home page
        window.location = 'http://localhost:3000/posts';
      }
    } catch(err) {
      if (err.response) {
        if (err.response.status === 401) {
          // User's session is already expired
          window.location = 'http://localhost:3000/session/new';
        }
      }
    }
  }

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

  return (
    <BrowserRouter>
      <Navbar setShowLogoutModal={setShowLogoutModal} toggleSidebar={toggleSidebar} sidebarActive={sidebarActive} user={user} navTitle={navTitle} />
      {showLogoutModal ? <LogoutModal logout={logout} setShowLogoutModal={setShowLogoutModal} /> : null}
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