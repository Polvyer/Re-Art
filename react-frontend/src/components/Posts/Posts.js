import React, { useState } from 'react';

// Components
import Post from './sub-components/Post';
import ImageModal from './sub-components/ImageModal';

// Styles
import { Deck } from './Styles';

const Posts = ({ posts }) => {

  const [ showModal, setShowModal ] = useState(false);
  const [ modalInfo, setModalInfo ] = useState({
    image: null,
    caption: null
  });

  // Toggle full-size display of image
  const toggleModal = (e) => {
    if (showModal) {
      setShowModal(false);
    } else {
      setModalInfo({
        image: e.target.src,
        caption: e.target.alt,
      });
      setShowModal(true);
    }
  };

  return (
    <Deck className="mx-auto my-5">
      {(posts.length > 0) ? posts.map(post => <Post key={post._id} toggleModal={toggleModal} post={post} />) : <h1>No Posts Yet</h1>}
      {showModal ? <ImageModal modalInfo={modalInfo} toggleModal={toggleModal} /> : null}
    </Deck>
  );
};

export default Posts;