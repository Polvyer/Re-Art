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

const FinalizeContainer = styled.div`
  height: 72vh;

  /* Flex Parent */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const SelectGroup = styled.div`
  width: 94%;
  color: white;

  /* Flex Parent */
  display: flex;

  label {
    font-weight: 600;
    font-size: 1.3rem;
    margin-right: 10px;
  }

  div {
    width: 47%;
    min-width: 141px;
  }

  select {
    border: 2px solid black;

    :active {
      border: 2px solid black;
    }
    :focus {
      border: 2px solid black; 
    }
  }
`;

const FormGroup = styled.div`
  width: 94%;
  color: white;

  label {
    font-weight: 600;
    font-size: 1.3rem;
  }

  input {
    border: 2px solid black;

    :active {
      border: 2px solid black;
    }
    :focus {
      border: 2px solid black; 
    }
  }
`;

const RadioGroup = styled.div`
  width: 94%;
  color: white;

  /* Flex Parent */
  display: flex;
  justify-content: space-evenly;

  label {
    font-weight: 600;
    font-size: 1.3rem;
    margin-left: 3px;
  }
`;

const RadioInput = styled.label`
  /* Flex Parent */
  display: flex;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    :checked + .radio__control {
      background: radial-gradient(black 50%, white 51%);
    }
  }
`;

const RadioControl = styled.span`
  display: block;
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  border: 2px solid black;
  background-color: white;
  transform: translateY(0.2em);
`;

const ButtonContainer = styled.div`
  height: 15vh;

  /* Flex Parent */
  display: flex;
  justify-content: space-around;
  align-items: flex-end;

  .btn-warning {
    color: white;
  }
`;

const Button = styled.button`
  margin: 10px;
  border-radius: 50px;
  width: 9rem;
  font-size: 1.3rem;
  box-shadow: 0px 2px 5px black;
`;

const FinalizePost = ({ mountFeedback, formFields, handleFormChanges, submit }) => {

  // Context
  const { setNavTitle } = useContext(UserContext);

  // Changes the navbar title
  useEffect(() => {
    setNavTitle('Finalize Your Post');
  }, [setNavTitle]);

  return (
    <ContentContainer>
      <FinalizeContainer>
        <SelectGroup className="form-group">
          <label>Select art type:</label>
          <div>
            <select name="art_type" value={formFields.art_type} onChange={handleFormChanges} className="form-control">
              <option>Drawing</option>
              <option>Photography</option>
              <option>Painting</option>
              <option>Inking</option>
            </select>
          </div>
        </SelectGroup>
        <FormGroup className="form-group">
          <label>Write some <i>tags</i> separated by spaces that will help people find your post:</label>
          <input type="text" className="form-control" name="hashtags" value={formFields.hashtags} onChange={handleFormChanges} placeholder="surrealism cubism ..." />
        </FormGroup>
        <RadioGroup className="form-group">
          <div className="form-check form-check-inline">
            <RadioInput htmlFor="custom-radio-one">
              <input id="custom-radio-one" className="form-check-input" type="radio" name="private" checked={formFields.private === false} value={false} onChange={handleFormChanges} />
              <RadioControl className="radio__control" />
            </RadioInput>
            <label className="form-check-label">Public</label>
          </div>
          <div className="form-check form-check-inline">
            <RadioInput htmlFor="custom-radio-two">
              <input id="custom-radio-two" className="form-check-input" type="radio" name="private" checked={formFields.private === true} value={true} onChange={handleFormChanges} />
              <RadioControl className="radio__control" />
            </RadioInput>
            <label className="form-check-label">Private</label>
          </div>
        </RadioGroup>
      </FinalizeContainer>
      <ButtonContainer>
        <Button onClick={mountFeedback} className="btn btn-danger">Back</Button>
        {(formFields.art_type && formFields.hashtags) ? <Button onClick={submit} className="btn btn-warning">Post</Button> : <Button className="btn btn-warning" disabled>Post</Button>}
      </ButtonContainer>
    </ContentContainer>
  );
};

export default FinalizePost;