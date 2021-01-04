import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import FormContainer from './FormContainer'

const Login = () => {

  const { user, setUser, setNavTitle } = useContext(UserContext);

  useEffect(() => {
    setNavTitle('Login');
  }, [])

  return (
    <FormContainer className="signup-form">
      <form action="/examples/actions/confirmation.php" method="post">
		    <h2>Login</h2>
		    <hr />
        <div className="form-group">
			    <div className="input-group">
				    <div className="input-group-prepend">
					    <span className="input-group-text">
						    <span className="fa fa-user"></span>
					    </span>                    
				    </div>
				    <input type="text" className="form-control" name="username" placeholder="Username" required="required" />
			    </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-lock"></i>
              </span>                    
            </div>
            <input type="text" className="form-control" name="password" placeholder="Password" required="required" />
          </div>
        </div>
        <div className="form-group">
          <a href="#">Forgot Password?</a>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-lg">Login</button>
        </div>
      </form>
      <div className="text-center">
        Not a member? <Link to="/users/new">Signup now</Link>
      </div>
    </FormContainer>
  );
};

export default Login;