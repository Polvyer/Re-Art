import React, { useEffect, useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Components
import Input from './Input';
import Feedback from './Feedback';

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

  // Context
  const { setNavTitle } = useContext(UserContext);

  // Used to allow us to call scrollIntoView
  const imageRef = useRef(null);

  // Changes the navbar title
  useEffect(() => {
    setNavTitle('Upload Your Image');
  }, [setNavTitle]);

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

  const send = () => {
    const formData = new FormData();
    formData.append('imageData', image.file);
    const config = {
      withCredentials: true,
      headers: {
        'content-type': 'multipart/form-data',
      }
    }
    axios.post('http://localhost:5000/posts', formData, config)
      .then(response => {
        console.log('Response: ', response);
      }).catch(err => {
        console.log('Err: ', err.response);
      });
  }

  return (
    <MainContainer>
      <Input changeImage={changeImage} />
      <Feedback imageRef={imageRef} image={image} showRemoveButton={showRemoveButton} removeFile={removeFile} />
    </MainContainer>
  );
};

export default Upload;