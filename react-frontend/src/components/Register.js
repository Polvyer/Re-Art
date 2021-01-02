import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  width: 400px;
  @media screen and (max-width: 420px) {
    width: 350px;
  }
  @media screen and (max-width: 360px) {
    width: 300px;
  }
  @media screen and (max-width: 300px) {
    width: 250px;
  }
  margin: 0 auto;
  padding: 30px 0;
  border-radius: 10px;
  color: #fff;
  form {
    color: #999;
	  border-radius: 3px;
	  margin-bottom: 15px;
	  background: #fff;
	  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
	  padding: 30px;
  }
  h2 {
    color: #333;
    font-weight: bold;
    margin-top: 0;
  }
  hr {
    margin: 0 -30px 20px;
  }
  .form-group {
    margin-bottom: 20px;
  }
  label {
    font-weight: normal;
	  font-size: 15px;
  }
  .form-control {
    min-height: 38px;
    box-shadow: none !important;
    font-size: 15px;
  }
  .form-control, .form-control:focus, .input-group-text {
	  border-color: #e1e1e1;
  }
  .form-control, .btn {        
	  border-radius: 3px;
  } 
  .input-group-addon {
    max-width: 42px;
    text-align: center;
  }
  .btn, .btn:active {
    font-size: 16px;
	  font-weight: bold;
	  border: none;
	  min-width: 140px;
  }
  .text-center a {
    color: #fff;	
  }
  a {
    text-decoration: underline;
  }
  a:hover {
    text-decoration: none;
  }
  form a {
    text-decoration: none;
  }	
  form a:hover {
	  text-decoration: underline;
  }
  .fa {
	  font-size: 21px;
  }
  .fa-paper-plane {
	font-size: 18px;
  }
  .fa-check {
    color: #fff;
    left: 17px;
    top: 18px;
    font-size: 7px;
    position: absolute;
  }
`;

const Register = () => {
  return (
    <FormContainer className="signup-form">
      <form action="/examples/actions/confirmation.php" method="post">
		    <h2>Sign Up</h2>
		    <p>Please fill in this form to create an account!</p>
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
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-lock"></i>
                <i className="fa fa-check"></i>
              </span>                    
            </div>
            <input type="text" className="form-control" name="confirm_password" placeholder="Confirm Password" required="required" />
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
        Already have an account? <a href="#">Login here</a>
      </div>
    </FormContainer>
  );
};

export default Register;