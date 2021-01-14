import React, { useEffect, useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Context
import { UserContext } from '../context/UserContext';

// Components
import Sidebar from './Sidebar';
import Posts from './Posts/Posts';
import Error from './Error';
import Spinner from './Spinner';
import ScrollArrow from './ScrollArrow';

// Filter Icons
import Anonymous from '../images/userIcons/anonymous.svg';
import Hobbyist from '../images/userIcons/hobbyist.png';
import Professional from '../images/userIcons/professional.png';
import Student from '../images/userIcons/student.png';

const MainContainer = styled.main`
  display: flex;
  width: 100%;
  position: relative;
`;

const Home = ({ sidebarActive, setSidebarActive }) => {

  // State
  const [ contentLoaded, setContentLoaded ] = useState(false);
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
        // Get rid of spinner
        setContentLoaded(true);

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

  // Changes navbar title
  useEffect(() => {
    if (!artTypeFilters.every(e => !e.checked) || !iconFilters.every(e => !e.checked) || hashtagFilter) {
      setNavTitle('Search Results');
    } else {
      setNavTitle('Home');
    }
  }, [artTypeFilters, iconFilters, hashtagFilter, setNavTitle])

  useEffect(() => {
    // componentDidMount
    fetchPosts();

    // componentWillUnmount (cleanup)
    return () => {
      setSidebarActive(false);
      setPosts([]);
      setErrors([]);
    }
  }, [setSidebarActive, setNavTitle, setPosts]);

  // Closes error
  const closeError = (index) => {
    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  };

  // Prepare to filter posts
  let filteredPosts = [...posts];
  // True if even one art type filter is checked
  const applyArtTypeFilters = !artTypeFilters.every(e => !e.checked);
  // True if even one icon filter is checked
  const applyIconFilters = !iconFilters.every(e => !e.checked);
  // True if hashtag filter has input
  const applyHashtagFilter = hashtagFilter;
  // If no filters are checked => don't filter!
  if (applyArtTypeFilters || applyIconFilters || applyHashtagFilter) {
    filteredPosts = posts.filter(post => {

      // Check if at least one art_type filter is checked
      if (applyArtTypeFilters) {
        // Check if at least one art_type filter applies
        if (!artTypeFilters.some(e => (e.checked && e.type === post.art_type))) {
          // No art_type filter applies
          return false;
        }
      }

      // Check if at least one icon filter is checked
      if (applyIconFilters) {
        // Check if at least one icon filter applies
        if (!iconFilters.some(e => (e.checked && e.type === post.poster.icon))) {
          // No icon filter applies
          return false;
        }
      }

      // Check if there's any input in the hashtag filter
      if (applyHashtagFilter) {
        const hashtagArray = hashtagFilter.split(' ');
        // Check if at least one hashtag filter applies
        if (!hashtagArray.some(e => post.hashtags.toLowerCase().includes(e.toLowerCase()))) {
          // No hashtag filter applies
          return false;
        }
      }

      return true;
    });
  }

  // MongoDB returns posts from oldest to newest, so just reverse
  const sortedPosts = filteredPosts.reverse();

  // Decides whether to generate errors or content
  const renderContent = () => {
    if (errors.length > 0) {
      return (
        <div className="mt-2">
          {errors.map((error, index) => <Error key={index} closeError={closeError} error={error} index={index} errorRef={errorRef} />)}
        </div>
      );
    }
    return (
      <MainContainer>
        {(contentLoaded && sidebarActive) ? <Sidebar artTypes={artTypeFilters} setArtTypes={setArtTypes} icons={iconFilters} setIcons={setIcons} hashtag={hashtagFilter} setHashtag={setHashtag} /> : null}
        { contentLoaded ? <Posts posts={sortedPosts} /> : <Spinner />}
        <ScrollArrow />
      </MainContainer>
    );
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default Home;