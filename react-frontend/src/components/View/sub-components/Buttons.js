import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Context
import { UserContext } from '../../../context/UserContext';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 10px;

  // All buttons
  .btn {
    color: white;
    margin-bottom: 5px;
  }

  // Favorite button
  .purple {
    background-color: #70118d;
    :hover {
      background-color: rgb(112, 17, 141, 0.7);
    }
  }
`;

// Loading button styles
const SpinnerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  // Spinner
  span {
    margin-right: 5px;
  }
`;

const Buttons = ({ priv, _id }) => {

  const { user } = useContext(UserContext);

  return (
    <Container>
      {(user && user._id === _id) ? <UserButtons priv={priv} /> : ( user ? <button className="btn normal purple">Favorite</button> : null)}
    </Container>
  );
};

const UserButtons = ({ priv }) => {
  return (
    <>
      <button className="btn btn-danger normal">Delete</button>
      <button className="btn btn-warning normal">Edit</button>
      <button className="btn btn-info normal">Make {priv ? 'Public' : 'Private'}</button>
    </>
  );
};

// For when user submits changes
const LoadingButton = ({ word }) => {
  return (
    <SpinnerButton className="btn btn-success" type="button" disabled>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      {word}...
    </SpinnerButton>
  );
};

export default Buttons;