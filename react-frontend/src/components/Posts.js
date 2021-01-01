import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Sidebar from './Sidebar';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Posts = ({ toggleSidebar, sidebarActive }) => {

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await axios.get(
      'http://localhost:5000/posts'
    );

    console.log('Data: ', data);
  }

  return (
    <Wrapper>
      {!sidebarActive ? <Sidebar /> : null}
      <div id="content">
        <h1>Content</h1>
      </div>
    </Wrapper>
  )
}

export default Posts;