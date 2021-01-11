import React, { useEffect, useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Components
import Input from './Input';
import JumboImage from './JumboImage';
import Feedback from './Feedback';
import FinalizePost from './FinalizePost';

// Context
import { UserContext } from '../context/UserContext';

const MainContainer = styled.main`
  /* Flex Parent */
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Upload = () => {

  // State
  const [ image, setImage ] = useState({
    file: null,
    url: null,
  });
  const [ showRemoveButton, setShowRemoveButton ] = useState(false);
  const [ showFeedback, setShowFeedback ] = useState(false);
  const [ showFinalizePost, setShowFinalizePost ] = useState(false);
  const [ formFields, setFormFields ] = useState({
    title: '',
    summary: '',
    art_type: 'Drawing',
    hashtags: '',
    private: false,
  });

  // Context
  const { setUser } = useContext(UserContext);

  // Used to redirect when user signs up successfully
  const history = useHistory();

  // Used to allow us to call scrollIntoView
  const imageRef = useRef(null);

  // Verify token
  useEffect(() => {
    async function checkIfLoggedIn() {
      try {
        // withCredentials indicates whether or not cross-site Access-Control requests should be made using credentials
        // GET request to /session
        await axios.get('http://localhost:5000/session',  { withCredentials: true });
      } catch(error) {
        // User is not logged in / token or cookie expired
        if (error.response) {
          // Make user null
          setUser(null);

          // Redirect to login
          history.push('/session/new');
        }
      }
    }
    checkIfLoggedIn();
  }, [history, setUser]);

  // Mounts Feedback and Unmounts FinalizePost
  const mountFeedback = () => {
    setShowFeedback(true);
    setShowFinalizePost(false);
  };

  // Mounts FinalizePost and Unmounts Feedback
  const mountFinalizePost = () => {
    setShowFeedback(false);
    setShowFinalizePost(true);
  };

  // Handles image upload
  const changeImage = (e) => {
    /* The html element <input/ type="file"> allows the user to select a 
       local file and add it to the FileList object which stores the 
       selected file to a files array.
       The URL.creatObjectURL() method takes an object (like our file) 
       and creates a temporary local URL that is tied to the document in which 
       it is created (meaning it won’t remember the URL if you leave the page and come back). */
    if (e.target.files.length > 0) { // Prevents a weird bug that happens when a user uploads, but then cancels
      if (image.url) { // imageFile !== null (avoid memory issues)
        URL.revokeObjectURL(image.url);
      }

      setImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
      if (imageRef.current) {
        imageRef.current.scrollIntoView({ behavior: 'smooth' }); // Smooth is clean
      }

      // Remove button is now accessible
      setShowRemoveButton(true);
    }
  };

  // Removes current image uploaded
  const removeFile = () => {
    if (image.url) { // imageFile !== null (avoid memory issues)
      URL.revokeObjectURL(image.url);
    }

    // Image is now null
    setImage({
      file: null,
      url: null,
    });

    // Remove button is now inaccessible
    setShowRemoveButton(false);
  };

  // Alters form field state
  const handleFormChanges = (e) => {
    const newFormFields = {
      ...formFields,
      [e.target.name]: e.target.value,
    }

    // Convert 'private' field to boolean
    if (e.target.name === 'private') {
      if (newFormFields['private'] === 'true')
        newFormFields['private'] = true;
      else 
        newFormFields['private'] = false;
    }
    
    setFormFields(newFormFields);
  };

  // Create a new post (title, summary, art_type, hashtags, private, poster (portfolio id), image and date_posted and numberOfComments (handle this on server side))
  const submit = () => {
    // Append all form data
    const formData = new FormData();
    formData.append('title', formFields.title);
    formData.append('summary', formFields.summary);
    formData.append('art_type', formFields.art_type);
    formData.append('hashtags', formFields.hashtags);
    formData.append('private', formFields.private); // Boolean
    formData.append('file', image.file); // Image file

    // Axios configs
    const config = {
      withCredentials: true,
      headers: {
        'content-type': 'multipart/form-data',
      }
    };

    // POST request to /posts
    axios.post('http://localhost:5000/posts', formData, config)
      .then(response => {
        console.log('Response: ', response);

        // Redirect to /posts
        history.push('/posts');

      }).catch(err => {
        console.log('Err: ', err.response);
      });
  };

  // Determines what type of content to show (Upload, Feedback, or Finalize)
  const showContent = () => {
    if (showFeedback) {
      return <Feedback setShowFeedback={setShowFeedback} formFields={formFields} handleFormChanges={handleFormChanges} mountFinalizePost={mountFinalizePost} />
    } else if (showFinalizePost) {
      return <FinalizePost submit={submit} mountFeedback={mountFeedback} formFields={formFields} handleFormChanges={handleFormChanges} />
    }
    return <JumboImage setShowFeedback={setShowFeedback} imageRef={imageRef} image={image} showRemoveButton={showRemoveButton} removeFile={removeFile} />
  }

  return (
    <MainContainer>
      <Input image={image} changeImage={changeImage} showFeedback={showFeedback} showFinalizePost={showFinalizePost} />
      {showContent()}
    </MainContainer>
  );
};

export default Upload;