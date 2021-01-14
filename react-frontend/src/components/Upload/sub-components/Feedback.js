import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

// Context
import { UserContext } from '../../../context/UserContext';

const ContentContainer = styled.div`
  min-height: 87vh; /* ImageContainer height + ButtonContainer height */
  width: 100%;

  /* Flex Child */
  flex-grow: 20;
  flex-basis: 300px;
`;

const FeedbackContainer = styled.div`
  height: 72vh;

  /* Flex Parent */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

const FormGroup = styled.div`
  width: 94%;
  color: white;

  label {
    font-weight: 600;
    font-size: 1.3rem;
  }

  textarea {
    border: 2px solid black;
    :active {
      border: 2px solid black;
    }
    :focus {
      border: 2px solid black; 
    }
  }
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

const Feedback = ({ setShowFeedback, formFields, handleFormChanges, mountFinalizePost }) => {

  // Context
  const { setNavTitle } = useContext(UserContext);

  // Changes the navbar title
  useEffect(() => {
    setNavTitle('Ask For Feedback');
  }, [setNavTitle]);

  return (
    <ContentContainer>
      <FeedbackContainer className="pt-1">
        <FormGroup className="form-group">
          <label>Briefly summarize the feedback you want for this image</label>
          <textarea maxLength="50" className="form-control" rows="2" name="title" value={formFields.title} onChange={handleFormChanges}></textarea>
        </FormGroup>
        <FormGroup className="form-group">
          <label>Now, describe in detail what you want other artists to give you feedback on</label>
          <textarea maxLength="1000" className="form-control" rows="6" name="summary" value={formFields.summary}  onChange={handleFormChanges}></textarea>
        </FormGroup>
      </FeedbackContainer>
      <ButtonContainer>
        <Button onClick={setShowFeedback.bind(null, false)} className="btn btn-danger">Back</Button>
        {(formFields.title && formFields.summary) ? <Button onClick={mountFinalizePost} className="btn btn-success">Next</Button> : <Button className="btn btn-success" disabled>Next</Button>}
      </ButtonContainer>
    </ContentContainer>
  );
};

export default Feedback;