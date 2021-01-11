import React, { useEffect, useContext, useState, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Styles
import { ContentContainer, CustomInput, HiddenInput, Pencil, Image, TextContainer, SelectLabel, SelectButtons, FormGroup, FooterButtons } from './Styles';

// Components
import Error from '../Error';

// Sub-Components
import ActiveIconRadio from './sub-components/ActiveIconRadio';
import IconRadio from './sub-components/IconRadio';

// Context
import { UserContext } from '../../context/UserContext';

// Profile icons
import Anonymous from '../../images/userIcons/anonymous.svg';
import Hobbyist from '../../images/userIcons/hobbyist.png';
import Professional from '../../images/userIcons/professional.png';
import Student from '../../images/userIcons/student.png';

// Utility icons
import pencil_square from '../../images/utilityIcons/pencil-square.svg'

// Default Avatar
import DefaultAvatar from '../../images/userIcons/default.png';

const EditInfo = ({ data, setData, info, setShowEditInfo, userid }) => { // info => biography, icon, owner (username), _id, avatar

  // Context
  const { setNavTitle, setUser, user } = useContext(UserContext);

  // State
  const [ image, setImage ] = useState({
    file: null,
    url: (user.avatar && user.avatar.location) || DefaultAvatar,
  });
  const [ formFields, setFormFields ] = useState({
    biography: info.biography || '',
    icon: info.icon,
  });
  const [ errors, setErrors ] = useState([]);

  // Used to allow us to call scrollIntoView
  const errorRef = useRef(null);

  // Used to redirect when user updates their profile successfully
  const history = useHistory();

  // Scrolls user up to errors
  useEffect(() => {
    if ((errors.length > 0) && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth' }); // Smooth is clean
    }
  }, [errors]);

  // Changes the navbar title
  useEffect(() => {
    setNavTitle('Editing Portfolio');
  }, [setNavTitle]);

  // Runs only when compoment unmounts
  useEffect(() => {
    // Removes image url from memory if user cancels form field
    return () => {
      if (image.url && (image.url !== DefaultAvatar)) { // imageFile !== null (avoid memory issues)
        URL.revokeObjectURL(image.url);
      }
    }
  }, [image.url])

  // Send updated portfolio info
  const submit = async (e) => {
    try {
      // Append all form data
      const formData = new FormData();
      formData.append('biography', formFields.biography);
      formData.append('icon', formFields.icon);
      formData.append('file', image.file); // Image file

      // Axios configs
      const config = {
        withCredentials: true,
        headers: {
          'content-type': 'multipart/form-data',
        }
      };
    
      // PUT request to /users/userid
      const response = await axios.put(`http://localhost:5000/users/${userid}`, formData, config);

      // If successful
      if (response.status === 200) {
        const newUser = { ...response.data, owner: info.owner };
        setUser(newUser); // Update user
        setData({ ...newUser, posts: data.posts }); // Update portfolio info
        setShowEditInfo(false); // Close edit component
        history.push(`/users/${userid}`); // Redirect to portfolio
      }
    } catch(error) {
      console.log(error.response)
    }
  }

  // Change form fields (biography and artist type)
  const handleFormChanges = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  // Handles image upload (passed to the hidden input's onChange)
  const changeImage = (e) => {
    if (e.target.files.length > 0) { // Prevents a weird bug that happens when a user uploads, but then cancels

      // Only accept image file types (jpg, jpeg, png)
      if ((e.target.files[0].type !== 'image/jpeg') && (e.target.files[0].type !== 'image/png')) {
        setErrors(['Only files with the following extension are allowed: png jpg jpeg']);
        return;
      }

      // Avoid memory issues
      if (image.url && (image.url !== DefaultAvatar)) {
        URL.revokeObjectURL(image.url);
      }

      // Change the avatar to the new image
      setImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  // Closes error
  const closeError = (index) => {
    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  }

  // Icon array
  const icons = [
    { src: Hobbyist, alt: 'Hobbyist' },
    { src: Student, alt: 'Student' },
    { src: Professional, alt: 'Professional' },
    { src: Anonymous, alt: 'Anonymous' },
  ];

  return (
    <div>
      {errors.length > 0 ? errors.map((error, index) => <Error errorRef={errorRef} closeError={closeError} error={error} index={index} key={index} />) : null}
      <ContentContainer className="px-3 my-5 py-3">
        <CustomInput htmlFor="file-upload" className="custom-file-upload mx-auto">
          <HiddenInput onChange={changeImage} id="file-upload" type="file" />
          <Image className="img-fluid" src={image.url} alt="Avatar" />
          <Pencil src={pencil_square} />
        </CustomInput>
        <TextContainer>
          <div className="username">@{info.owner}</div>
        </TextContainer>
        <SelectLabel>Artist Type</SelectLabel>
        <SelectButtons className="btn-group-toggle" data-toggle="buttons">
          {icons.map(icon => {
            if (icon.alt === formFields.icon) {
              return <ActiveIconRadio key={icon.alt} icon={icon} />
            }
            return <IconRadio key={icon.alt} icon={icon} handleFormChanges={handleFormChanges} />
          })}
        </SelectButtons>
        <FormGroup className="form-group">
          <label>Biography</label>
          <textarea maxLength="150" value={formFields.biography} onChange={handleFormChanges} className="form-control" rows="3" name="biography"></textarea>
        </FormGroup>
        <FooterButtons>
          <button onClick={setShowEditInfo.bind(null, false)} className="btn btn-danger"><i className="fa fa-times-circle-o" aria-hidden="true"></i> Cancel</button>
          <button onClick={submit} className="btn btn-success"><i className="fa fa-floppy-o" aria-hidden="true"></i>   Save Changes</button>
        </FooterButtons>
      </ContentContainer>
    </div>
  );
};

export default EditInfo;