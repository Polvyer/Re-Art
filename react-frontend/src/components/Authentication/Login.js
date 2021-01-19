import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

// Context
import { UserContext } from '../../context/UserContext';

// Styles
import FormContainer from './Styles';

const Login = () => {

  // Context
  const { setUser, setNavTitle } = useContext(UserContext);

  // State
  const [ errors, setErrors ] = useState([]);
  const [ formValues, setFormValues ] = useState({
    username: '',
    password: '',
  });

  // Used to redirect when user signs up successfully
  const history = useHistory();

  // Used to allow us to call scrollIntoView
  const errorRef = useRef(null);

  // Changes the navbar title
  useEffect(() => {
    setNavTitle('Login');
  }, [setNavTitle]);

  // Adjusts form field values
  const fillForm = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  // Form validation and submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST request to /session
      const response = await axios.post('/api/session', formValues, { withCredentials: true });

      if (response.status === 200) {
        // Set user globally
        setUser(response.data); // { _id (portfolio), owner (username), icon, biography, avatar }

        // Redirect to home page
        history.push(`/posts`);
      } else {
        // Something other than 200 got returned, but it's not an 'error'
        setErrors([`${response.status}. That's an error.`]);
      }
    } catch(error) {
      if (error.response) { // Errors were sent from server purposefully
        setErrors(error.response.data)
      } else { // Server down possibly
        setErrors(['Oops! Something went wrong, please try again.']);
      }
    }
  };

  return (
    <FormContainer className="signup-form my-5 pt-3">
      {errors.length > 0 ? errors.map((error, index) => <div ref={index.toString() === '0' ? errorRef : undefined} key={index} className="alert alert-danger">{error}</div>) : null}
      <form onSubmit={handleSubmit}>
		    <h2>Login</h2>
		    <hr />
        <div className="form-group">
			    <div className="input-group">
				    <div className="input-group-prepend">
					    <span className="input-group-text">
						    <span className="fa fa-user"></span>
					    </span>                    
				    </div>
				    <input type="text" className="form-control" name="username" placeholder="Username" minLength="6" maxLength="16" required="required" value={formValues.username} onChange={fillForm} />
			    </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-lock"></i>
              </span>                    
            </div>
            <input type="password" className="form-control" name="password" placeholder="Password" minLength="6" maxLength="20" required="required" value={formValues.password} onChange={fillForm} />
          </div>
        </div>
        <div className="form-group">
          <Link className="forgot-password" to="#">Forgot Password?</Link>
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