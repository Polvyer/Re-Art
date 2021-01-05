import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Context
import { UserContext } from '../context/UserContext';

// Components
import Sidebar from './Sidebar';
import Posts from './Posts';

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

  // Set art type filters
  const setArtTypes = (index) => {
    const newArtTypes = [ ...artTypeFilters ];
    newArtTypes[index].checked = !newArtTypes[index].checked;
    setArtTypeFilters(newArtTypes);
  }

  // Set icon filters
  const setIcons = (index) => {
    const newIcons = [ ...iconFilters ];
    newIcons[index].checked = !newIcons[index].checked;
    setIconFilters(newIcons);
  }

  // Set hashtag filters
  const setHashtag = (e) => {
    setHashtagFilter(e.target.value);
  }

  // Get list of posts from the database
  const fetchPosts = async () => {
    // GET request to /posts
    const response = await axios.get('http://localhost:5000/posts', { withCredentials: true });
    setPosts(response.data);
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

  return (
    <Main>
      {sidebarActive ? <Sidebar artTypes={artTypeFilters} setArtTypes={setArtTypes} icons={iconFilters} setIcons={setIcons} hashtag={hashtagFilter} setHashtag={setHashtag} /> : null}
      <Posts posts={posts} />
    </Main>
  );
};

export default Home;