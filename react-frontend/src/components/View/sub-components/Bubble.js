import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .body {
    position: relative;
    max-width: 100%;
    height: auto;
    margin: 20px 10px;
    padding: 5px;
    background-color: white;
    border-radius: 3px;
    border: 5px solid white;

    .message {
      min-height: 30px;
      border-radius: 3px;
      font-family: Arial;
      font-size: 14px;
      line-height: 1.5;
      color: black;
    }
  }
  
  .tip {
    width: 0px;
    height: 0px;
    position: absolute;
    background: transparent;
    border: 10px solid white;
  }

  .tip-left {
    top: 50%;
    left: -25px;
    transform: translate(0, -50%);
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;  
  }
`;

const Bubble = ({ description }) => {
  return (
    <Container className="dialogbox">
      <div className="body">
        <span className="tip tip-left"></span>
        <div className="message">
          <span>{description}</span>
        </div>
      </div>
    </Container>
  );
};

export default Bubble;