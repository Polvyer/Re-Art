import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

// Context
import { UserContext } from '../context/UserContext';

// Styled Components
import FormContainer from './FormContainer';

const Signup = () => {

  // Context
  const { setUser, setNavTitle } = useContext(UserContext);

  // State
  const [ errors, setErrors ] = useState([]);
  const [ formValues, setFormValues ] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  // Used to redirect when user signs up successfully
  const history = useHistory();

  // Used to allow us to call scrollIntoView
  const errorRef = useRef(null);

  // Scrolls user up to errors
  useEffect(() => {
    if ((errors.length > 0) && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [errors])

  // Changes the navbar title
  useEffect(() => {
    setNavTitle('Sign Up');
  }, [setNavTitle]);

  // Adjusts form field values
  const fillForm = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  // POST request to /users
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formValues.password !== formValues.confirm_password) {
      setErrors(["Passwords do not match"]);
      return;
    }

    try {
      // POST to /users
      const response = await axios.post('http://localhost:5000/users', formValues, { withCredentials: true });

      if (response.status === 200) {
        // Set user globally
        setUser(response.data);

        // Redirect to user's portfolio
        history.push(`/users/${response.data._id}`);
      }
    } catch(error) {
      if (error.response) {
        // Set errors for React to render
        setErrors(error.response.data)

        /* Log errors (for axios)
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        */
      }
    }
  };

  return (
    <FormContainer className="signup-form">
      {errors.length > 0 ? errors.map((error, index) => <div ref={index.toString() === '0' ? errorRef : undefined} key={index} className="alert alert-danger">{error}</div>) : null}
      <form onSubmit={handleSubmit}>
		    <h2>Sign Up</h2>
		    <p>Please fill in this form to create an account!</p>
		    <hr />
        <div className="form-group password">
			    <div className="input-group">
				    <div className="input-group-prepend">
					    <span className="input-group-text">
						    <span className="fa fa-user"></span>
					    </span>                    
				    </div>
				    <input type="text" className="form-control" name="username" placeholder="Username" minLength="6" maxLength="16" required="required" value={formValues.username} onChange={fillForm} />
			    </div>
          <small className="form-text text-muted">
            Your username must be 6-16 characters long.
          </small>
        </div>
        <div className="form-group">
			    <div className="input-group">
				    <div className="input-group-prepend">
					    <span className="input-group-text">
						    <i className="fa fa-paper-plane"></i>
					    </span>                    
				    </div>
				    <input type="email" className="form-control" name="email" placeholder="Email Address" required="required" value={formValues.email} onChange={fillForm} />
			    </div>
        </div>
        <div className="form-group password">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-lock"></i>
              </span>                    
            </div>
            <input type="password" className="form-control" name="password" placeholder="Password" minLength="6" maxLength="20" required="required" value={formValues.password} onChange={fillForm} />
          </div>
          <small className="form-text text-muted">
            Your password must be 6-20 characters long.
          </small>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-lock"></i>
                <i className="fa fa-check"></i>
              </span>                    
            </div>
            <input type="password" className="form-control" name="confirm_password" placeholder="Confirm Password" minLength="6" maxLength="20" required="required" value={formValues.confirm_password} onChange={fillForm} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-check-label">
            <input type="checkbox" required="required" /> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
        </div>
      </form>
      <div className="text-center">
        Already have an account? <Link to="/session/new">Login here</Link>
      </div>
    </FormContainer>
  );
};

export default Signup;