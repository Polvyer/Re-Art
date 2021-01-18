import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

// Models
import LogoutModal from '../../LogoutModal';

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

  // Edit button
  .edit {
    :hover {
      cursor: no-drop;
    }
  }

  // Favorite button
  .purple {
    background-color: #70118d;
    :hover {
      cursor: no-drop;
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

const Buttons = ({ priv, _id, setData, setErrors }) => {

  // State
  const [ showLogoutModal, setShowLogoutModal ] = useState(false);
  const [ showSpinner, setShowSpinner ] = useState(false);

  // Context
  const { user, setUser } = useContext(UserContext);

  // Used to redirect user to the home page when the user deletes their post
  const history = useHistory();

  // Extract postid
  const { postid } = useParams();

  // Handle post deletion
  const deletePost = async () => {

    // Hides delete post modal
    setShowLogoutModal(false);

    // Show loading button
    setShowSpinner(true);
    
    try {
      // DELETE request to /posts/:postid
      const response = await axios.delete(`http://localhost:5000/posts/${postid}`, { withCredentials: true });

      // Successful
      if (response.status === 200) {
        history.push('/posts');
      }
    } catch(err) {

      // Hide loading button
      setShowSpinner(false);

      if (err.response) { // Intentional error
        if (err.response.status === 401) { // Log out user
          setUser(null);
          history.push('/session/new');
        } else {
          setErrors(err.response.data);
        }

      } else { // Server down most likely
        setErrors(['Oops! Something went wrong, please try again.']);
      }
    }
  };

  // Toggle post's privacy
  const togglePrivacy = async () => {

    const formData = qs.stringify({
      'private': priv
    });

    const config = {
      withCredentials: true,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    };

    try {
      // PUT request to /posts/:postid
      const response = await axios.put(`http://localhost:5000/posts/${postid}`, formData, config);

      // Successful
      if (response.status === 200) {
        setData(response.data);
      }
    } catch(err) {
      if (err.response) { // Intentional error
        if (err.response.status === 401) { // Log out user
          setUser(null);
          history.push('/session/new');
        } else {
          setErrors(err.response.data);
        }

      } else { // Server down most likely
        setErrors(['Oops! Something went wrong, please try again.']);
      }
    }
  }

  return (
    <Container>
      {(user && user._id === _id) ? <UserButtons showSpinner={showSpinner} togglePrivacy={togglePrivacy} setShowLogoutModal={setShowLogoutModal} priv={priv} /> : ( user ? <button className="btn normal purple disabled">Favorite</button> : null)}
      { showLogoutModal ? <LogoutModal setShowLogoutModal={setShowLogoutModal} logout={deletePost} title="Delete" body="Are you sure you want to delete this post?" /> : null}
    </Container>
  );
};

// When it's the users own post
const UserButtons = ({ priv, setShowLogoutModal, togglePrivacy, showSpinner }) => {
  return (
    <>
      {showSpinner ? <LoadingButton word='Deleting' /> : <button onClick={setShowLogoutModal.bind(null, true)} className="btn btn-danger normal">Delete</button>}
      <button className="btn btn-warning normal edit" disabled>Edit</button>
      <button disabled={showSpinner} onClick={togglePrivacy} className="btn btn-info normal">Make {priv ? 'Public' : 'Private'}</button>
    </>
  );
};

// For when the user submits changes
const LoadingButton = ({ word }) => {
  return (
    <SpinnerButton className="btn btn-danger" type="button" disabled>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      {word}...
    </SpinnerButton>
  );
};

export default Buttons;