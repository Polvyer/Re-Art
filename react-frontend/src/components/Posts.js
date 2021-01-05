import React from 'react';

// Components
import Post from './Post';

// Styled Components
import { Deck } from './PostStyles';

const Posts = ({ posts }) => {

  return (
    <Deck className="mx-auto my-5">
      {posts.length > 0 ? posts.map((post, index) => <Post key={index} post={post} />) : <h1>No Posts Yet</h1>}
    </Deck>
  );
};

export default Posts;