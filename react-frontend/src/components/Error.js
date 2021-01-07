import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  width: 77%;
`;

const Error = ({ error, index, errorRef, closeError }) => {
  return (
    <ErrorContainer ref={index.toString() === '0' ? errorRef : undefined} className="alert alert-danger alert-dismissible fade show mx-auto" role="alert">
      {error}
      <button onClick={closeError.bind(null, index)} type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </ErrorContainer>
  );
}

export default Error;