import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Context
import { UserContext } from '../context/UserContext';

const CustomInput = styled.label`
  display: block;
  height: 100px;
  width: 100px;
  background-color: grey;
  color: white;
  font-weight: 900;
  font-size: 2rem;
  text-align: center;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Upload = () => {

  // State
  const [ image, setImage ] = useState({
    file: null,
    url: null,
  });

  // Context
  const { setNavTitle } = useContext(UserContext);

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
    }
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
    <div>
      Upload
      <CustomInput htmlFor="file-upload" className="custom-file-upload">
        <HiddenInput id="file-upload" type="file" onChange={changeImage} />
        +
      </CustomInput>
      <img src={image.url} alt="X" />
      <button onClick={send}>Upload</button>
    </div>
  );
};

export default Upload;