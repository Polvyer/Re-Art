import React from 'react';
import styled from 'styled-components';

const FeedbackContainer = styled.div`
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

const Image = styled.img`
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
`;

const Feedback = ({ image, imageRef, showRemoveButton, removeFile }) => {
  return (
    <FeedbackContainer>
      <ImageContainer>
        <Image ref={imageRef} className="img-fluid" src={image.url} />
      </ImageContainer>
      <ButtonContainer>
        {showRemoveButton ? <Button onClick={removeFile} className="btn btn-danger">Remove</Button> : <Button className="btn btn-danger invisible">Remove</Button>}
        {showRemoveButton ? <Button className="btn btn-success">Next</Button> : <Button className="btn btn-success" disabled>Next</Button>}
      </ButtonContainer>
    </FeedbackContainer>
  )
}

export default Feedback;