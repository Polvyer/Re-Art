import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Content } from './Styles';

// Components
import Header from './sub-components/Header';
import Details from './sub-components/Details';
import Comments from './sub-components/Comments';
import Error from '../Error';

// Context
import { UserContext } from '../../context/UserContext';

const View = () => {

  // State
  const [ data, setData ] = useState({
    art_type: '',
    date_posted: '',
    hashtags: '',
    numberOfComments: 0,
    image: {
      location: ''
    },
    poster: {
      icon: '',
      owner: '',
      _id: '#',
    },
    private: false,
    summary: '',
    title: '',
    _id: '',
  });
  const [ errors, setErrors ] = useState([]);

  // Context
  const { setNavTitle } = useContext(UserContext);

  // Extract postid from URL
  const { postid } = useParams();

  // Used to allow us to call scrollIntoView into errors
  const errorRef = useRef(null);

  // Used to redirect user to 404.html if not post is found
  const history = useHistory();

  // Change navbar title
  useEffect(() => {
    setNavTitle('Viewing Post');
  }, [setNavTitle]);

  // Get post details
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${postid}`);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (err) {
        if (err.response) { // Intentional error
          if ((err.response.status === 404) || (err.response.status === 400)) { // Post not found
            history.push('/404.html');
          } else {
            setErrors(err.response.data);
          }
        } else { // Server down most likely
          setErrors(['Oops! Something went wrong, please try again.']);
        }
      }
    }
    fetchPostDetails();
  }, [postid, history]);

  // Closes error
  const closeError = (index) => {
    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  };

  return (
    <Container>
      {errors.map((error, index) => <Error key={index} closeError={closeError} error={error} index={index} errorRef={errorRef} />)}
      <Header art_type={data.art_type} title={data.title} />
      <Content>
        <Details data={data} setData={setData} setErrors={setErrors} />
        <Comments posterid={data.poster._id} numberOfComments={data.numberOfComments} setErrors={setErrors} />
      </Content>
    </Container>
  );
};

export default View;