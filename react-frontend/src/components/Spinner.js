import React from 'react';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  margin: 0 auto;
  width: 10rem;
  height: 10rem;
`;

const Spinner = () => {
  return (
    <SpinnerContainer className="spinner-border my-5" role="status">
      <span className="sr-only">Loading...</span>
    </SpinnerContainer>
  );
};

export default Spinner;