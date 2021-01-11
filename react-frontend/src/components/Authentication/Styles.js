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
  padding: 0 0;
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
  .text-center {
    font-weight: 400;
  }
  .text-center a {
    color: #fff;
    font-weight: 600;	
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
  .password {
    margin-bottom: 10px;
  }

  // Needs to be implemented
  .forgot-password {
    cursor: not-allowed;
  }

  // Needs to be implemented
  .terms-of-use {
    cursor: not-allowed;
  }

  // Needs to be implemented
  .privacy-policy {
    cursor: not-allowed;
  }
`;

export default FormContainer;