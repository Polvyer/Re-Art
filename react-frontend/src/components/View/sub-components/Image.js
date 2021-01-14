import React, { useState } from 'react';
import styled from 'styled-components';

// Components
import ImageModal from '../../Posts/sub-components/ImageModal';

const Container = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-height: 24em;
  flex: 1;
  
  @media screen and (min-height: 1024px) {
    max-height: 50em;
  }

  // Post image
  .post-img {
    max-width: 100%;
    max-height: 100%;
    transition: 0.3s;
    cursor: pointer;
    :hover {
      opacity: 0.7;
    }
  }
`;

const Image = ({ image, owner }) => {

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
    <Container>
      <img className="img-fluid post-img" onClick={toggleModal} src={image} alt={owner} />
      {showModal ? <ImageModal modalInfo={modalInfo} toggleModal={toggleModal} /> : null}
    </Container>
  );
};

export default Image;