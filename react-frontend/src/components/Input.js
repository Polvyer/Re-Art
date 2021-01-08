import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.form`
  background-color: rgba(0, 0, 0, 0.5);
  height: 87vh;
  border: 5px solid rgba(92, 92, 92, 1);
  width: 100%;

  /* Flex Child */
  flex-grow: 1;
  flex-basis: 300px;
  flex-shrink: 1;

  /* Flex Parent */
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 627px) {
    height: 50vh;

    /* Flex Parent */
    align-items: center;
    justify-content: center;
  }

  @media screen and (min-height: 1023px) {
    height: 95vh;
  }
`;

const CustomInput = styled.label`
  /* Positioning */
  margin: 20px;
  height: 220px;
  width: 250px;

  /* Aesthetics */
  background-color: #a4a4a4;
  color: white;
  font-weight: 900;
  font-size: 4rem;
  cursor: pointer;

  /* Flex Parent */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Input = ({ changeImage }) => {
  return (
    <InputContainer>
      <CustomInput htmlFor="file-upload" className="custom-file-upload">
        <HiddenInput id="file-upload" type="file" onChange={changeImage} />
        +
      </CustomInput>
    </InputContainer>
  )
}

export default Input;