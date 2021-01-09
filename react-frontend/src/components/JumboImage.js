import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

// Context
import { UserContext } from '../context/UserContext';

const ContentContainer = styled.div`
  min-height: 87vh; /* ImageContainer height + ButtonContainer height */
  width: 100%;

  /* Flex Child */
  flex-grow: 20;
  flex-basis: 300px;
`;

const ImageContainer = styled.div`
  height: 72vh;

  /* Flex Parent */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  max-width: 80%;
  max-height: 66vh; /* Lower than ImageContainer height */
`;

const ButtonContainer = styled.div`
  height: 15vh;

  /* Flex Parent */
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
`;

const Button = styled.button`
  margin: 10px;
  border-radius: 50px;
  width: 9rem;
  font-size: 1.3rem;
  box-shadow: 0px 2px 5px black;
`;

const JumboImage = ({ image, imageRef, showRemoveButton, removeFile, setShowFeedback }) => {

  // Context
  const { setNavTitle } = useContext(UserContext);

  // Changes the navbar title
  useEffect(() => {
    setNavTitle("Upload Your Image");
  }, [setNavTitle]);

  return (
    <ContentContainer>
      <ImageContainer>
        <Img ref={imageRef} className="img-fluid" src={image.url} />
      </ImageContainer>
      <ButtonContainer>
        {showRemoveButton ? <Button onClick={removeFile} className="btn btn-danger">Remove</Button> : <Button className="btn btn-danger invisible">Remove</Button>}
        {showRemoveButton ? <Button onClick={setShowFeedback.bind(null, true)} className="btn btn-success">Next</Button> : <Button className="btn btn-success" disabled>Next</Button>}
      </ButtonContainer>
    </ContentContainer>
  )
}

export default JumboImage;