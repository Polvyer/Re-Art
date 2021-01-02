import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Sidebar from './Sidebar'
import Posts from './Posts'
import Anonymous from '../images/userIcons/anonymous.svg'
import Hobbyist from '../images/userIcons/hobbyist.png'
import Professional from '../images/userIcons/professional.png'
import Student from '../images/userIcons/student.png'


const Main = styled.main`
  display: flex;
  width: 100%;
  position: relative;
`;

const Content = ({ toggleSidebar, sidebarActive }) => {

  const [ data, setData ] = useState([]);

  const [ hashtagFilter, setHashtagFilter ] = useState('');

  const [ artTypeFilters, setArtTypeFilters ] = useState([
    { type: 'Drawing', checked: true },
    { type: 'Photography', checked: true },
    { type: 'Painting', checked: true },
    { type: 'Inking', checked: true },
  ]);

  const [ iconFilters, setIconFilters ] = useState([
    { type: 'Hobbyist', checked: true, img: Hobbyist },
    { type: 'Student', checked: true, img: Student },
    { type: 'Professional', checked: true, img: Professional },
    { type: 'Anonymous', checked: true, img: Anonymous },
  ]);

  const setArtTypes = (index) => {
    const newArtTypes = [ ...artTypeFilters ];
    newArtTypes[index].checked = !newArtTypes[index].checked;
    setArtTypeFilters(newArtTypes);
  }

  const setIcons = (index) => {
    const newIcons = [ ...iconFilters ];
    newIcons[index].checked = !newIcons[index].checked;
    setIconFilters(newIcons);
  }

  const setHashtag = (e) => {
    setHashtagFilter(e.target.value);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await axios.get(
      'http://localhost:5000/posts'
    );
    setData(data.data);
  };

  return (
    <Main>
      {sidebarActive ? <Sidebar artTypes={artTypeFilters} setArtTypes={setArtTypes} icons={iconFilters} setIcons={setIcons} hashtag={hashtagFilter} setHashtag={setHashtag} /> : null}
      <Posts posts={data} />
    </Main>
  );
};

export default Content;