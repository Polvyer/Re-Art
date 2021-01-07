import React, { useEffect, useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Context
import { UserContext } from '../context/UserContext';

// Components
import Sidebar from './Sidebar';
import Posts from './Posts';
import Error from './Error';

// Filter Icons
import Anonymous from '../images/userIcons/anonymous.svg';
import Hobbyist from '../images/userIcons/hobbyist.png';
import Professional from '../images/userIcons/professional.png';
import Student from '../images/userIcons/student.png';

const Main = styled.main`
  display: flex;
  width: 100%;
  position: relative;
`;

const Home = ({ sidebarActive, setSidebarActive }) => {

  // State
  const [ errors, setErrors ] = useState([]);
  const [ posts, setPosts ] = useState([]);
  const [ hashtagFilter, setHashtagFilter ] = useState('');
  const [ artTypeFilters, setArtTypeFilters ] = useState([
    { type: 'Drawing', checked: false },
    { type: 'Photography', checked: false },
    { type: 'Painting', checked: false },
    { type: 'Inking', checked: false },
  ]);
  const [ iconFilters, setIconFilters ] = useState([
    { type: 'Hobbyist', checked: false, img: Hobbyist },
    { type: 'Student', checked: false, img: Student },
    { type: 'Professional', checked: false, img: Professional },
    { type: 'Anonymous', checked: false, img: Anonymous },
  ]);

  // Context
  const { setNavTitle } = useContext(UserContext);

  // Used to allow us to call scrollIntoView
  const errorRef = useRef(null);

  // Set art type filters
  const setArtTypes = (index) => {
    const newArtTypes = [ ...artTypeFilters ];
    newArtTypes[index].checked = !newArtTypes[index].checked;
    setArtTypeFilters(newArtTypes);
  };

  // Set icon filters
  const setIcons = (index) => {
    const newIcons = [ ...iconFilters ];
    newIcons[index].checked = !newIcons[index].checked;
    setIconFilters(newIcons);
  };

  // Set hashtag filters
  const setHashtag = (e) => {
    setHashtagFilter(e.target.value);
  };

  // Get list of posts from the database
  const fetchPosts = async () => {
    try {
      // GET request to /posts
      const response = await axios.get('http://localhost:5000/posts', { withCredentials: true });

      // Check if status is 200
      if (response.status === 200) {
        // Set user globally
        setPosts(response.data); // { _id, owner (username), icon, avatar, biography }
      } else {
        // Something other than 200 got returned, but it's not an 'error'
        setErrors([`${response.status}. That's an error.`]);
      }
    } catch(error) {
      if (error.response) { // Errors were sent from server purposefully
        setErrors(error.response.data);
      } else { // Server down possibly
        setErrors(['Oops! Something went wrong, please try again.']);
      }
    }
  };

  useEffect(() => {
    // componentDidMount
    fetchPosts();

    // Changes navbar title
    setNavTitle('Home');

    // componentWillUnmount
    return () => {
      setSidebarActive(false);
    }
  }, [setSidebarActive, setNavTitle]);

  // Closes error
  const closeError = (index) => {
    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  }

  // Decides whether to generate errors or content
  const renderContent = () => {
    if (errors.length > 0) {
      return (
        <div className="mt-2">
          {errors.map((error, index) => <Error key={index} closeError={closeError} error={error} index={index} errorRef={errorRef} />)}
          <Posts posts={posts} />
        </div>
      )
    }
    return (
      <Main>
        {sidebarActive ? <Sidebar artTypes={artTypeFilters} setArtTypes={setArtTypes} icons={iconFilters} setIcons={setIcons} hashtag={hashtagFilter} setHashtag={setHashtag} /> : null}
        <Posts posts={posts} />
      </Main>
    );
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default Home;