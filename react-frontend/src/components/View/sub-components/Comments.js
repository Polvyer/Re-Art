import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

// Components
import Create from './Create';
import List from './List';

// Context
import { UserContext } from '../../../context/UserContext';

/* Comment section of post */

const Container = styled.div`
  background-color: #3c545c;
  padding: 10px;
  border-radius: 10px;
  min-height: 70vh;
  flex: 1;
  flex-basis: 500px;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  box-shadow: 0 0 10px black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .number {
    color: white;
  }
`;

const Comments = ({ numberOfComments, setErrors }) => {

  // State
  const [ listOfComments, setListOfComments ] = useState([]);
  const [commentInput, setCommentInput ] = useState('');
  const [ attachment, setAttachment ] = useState({
    file: null,
    image: null,
  });
  const [ commentCount, setCommentCount ] = useState(0);
  const [ showSpinner, setShowSpinner ] = useState(false);

  // Context
  const { user, setUser } = useContext(UserContext);

  // Extract :postid from params
  const { postid } = useParams();

  // Used to redirect user to login page when their session expired
  const history = useHistory();

  // Get list of comments for post
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(`/api/posts/${postid}/comments`, { withCredentials: true });

        // Successful
        if (response.status === 200) {
          setListOfComments(response.data);
        }
      } catch(err) {
        if (err.response) { // Intentional error
          setErrors(err.response.data);
        } else { // Server down most likely
          setErrors(['Oops! Something went wrong, please try again.']);
        }
      }
    }
    fetchComments();
  }, [postid, setErrors]);

  // Changes commentCount whenever numberOfComments changes
  useEffect(() => {
    setCommentCount(numberOfComments);
  }, [numberOfComments]);

  // Remove the current attachment's url on component unmount
  useEffect(() => {
    return () => {
      if (attachment.image) {
        URL.revokeObjectURL(attachment.image);
      }
    }
  }, [attachment.image]);

  // Handle attachment changes
  const changeAttachment = (e) => {

    if (e.target.files.length > 0) { // Prevents a weird bug that happens when a user uploads, but then cancels

      // Only accept image file types (jpg, jpeg, png)
      if ((e.target.files[0].type !== 'image/jpeg') && (e.target.files[0].type !== 'image/png')) {
        setErrors(['Only files with the following extension are allowed: png jpg jpeg']);
        return;
      }

      // Remove the current attachment's url
      if (attachment.image) {
        URL.revokeObjectURL(attachment.url);
      }

      // Change the attachment
      setAttachment({
        file: e.target.files[0],
        image: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  // Handle comment input changes
  const changeCommentInput = (e) => {
    setCommentInput(e.target.value);
  };

  // Remove the current attachment's url
  const removeAttachment = () => {

    if (attachment.image) {
      URL.revokeObjectURL(attachment.image);
    }

    setAttachment({
      file: null,
      url: null,
    });
  };

  // Post a new comment
  const postComment = async () => {

    // Validate that the user has inputted at least 1 character
    if (commentInput.length < 1) {
      return;
    }

    // Show loading button
    setShowSpinner(true);

    // Store form data
    const formData = new FormData();
    formData.append('attachment', attachment.file);
    formData.append('description', commentInput);

    const config = {
      withCredentials: true,
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    try {
      // POST request to /posts/:postid/comments
      const response = await axios.post(`/api/posts/${postid}/comments`, formData, config);

      // Hide loading button
      setShowSpinner(false);

      // Successful
      if (response.status === 200) {
        setListOfComments(listOfComments.concat(response.data));
        setCommentCount(commentCount + 1);
        setCommentInput('');
        removeAttachment();
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

  // Sort comments by number of likes
  let sortedListOfComments = [...listOfComments];
  if (listOfComments.length > 0) {
    sortedListOfComments = listOfComments.sort((a, b) => a.likes > b.likes ? -1 : 1)
  }

  return (
    <Container>
      <span className="number">{commentCount} {commentCount === 1 ? 'comment' : 'comments'}</span>
      <List listOfComments={sortedListOfComments} setListOfComments={setListOfComments} setCommentCount={setCommentCount} commentCount={commentCount} setErrors={setErrors} />
      {user ? <Create showSpinner={showSpinner} commentInput={commentInput} changeCommentInput={changeCommentInput} postComment={postComment} picture={attachment.image} changeAttachment={changeAttachment} removeAttachment={removeAttachment} /> : null}
    </Container>
  );
};

export default Comments;