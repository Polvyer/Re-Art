import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'

// Context
import { UserContext } from '../context/UserContext'

// Components
import Post from './Post'

const Deck = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 80%;
`;

const Posts = ({ posts }) => {

  const { user, setUser, setNavTitle } = useContext(UserContext);

  // Changes navbar title
  useEffect(() => {
    setNavTitle('Home');
  }, [setNavTitle]);

  return (
    <Deck className="mx-auto my-5">
      {posts.length > 0 ? posts.map((post, index) => <Post key={index} post={post} />) : <h1>No Posts Yet</h1>}
    </Deck>
  );
};

export default Posts;