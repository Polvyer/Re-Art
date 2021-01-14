import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 10px;
`;

const BackButton = styled.i`
  color: black;
  cursor: pointer;
  position: relative;
  ::after {
    content: '';
    display: inline-block;
    width: 80%;
    height: 80%;
    border-radius: 100px;
    position: absolute;
    top: 4px;
    left: 3px;
    z-index: -1;
    background-color: white;
  }
  :hover {
    ::after {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;

const Section = styled.div`
  display: flex;
  font-size: 1rem;

  .art_type {
    padding: 10px;
    background-color: #3c545c;
    color: white;
    margin-right: 10px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    font-family: 'Merriweather';
    font-weight: 600;
    font-style: oblique;
  }

  .title {
    padding: 10px;
    background-color: #3c545c;
    color: white;
    display: flex;
    align-items: center;
  }
`;

const Header = ({ art_type, title}) => {

  // Used to redirect to the home page
  const history = useHistory();

  // Go to home page
  const goToHomePage = () => {
    history.push('/posts');
  };

  return (
    <Container>
      <BackButton onClick={goToHomePage} className="fa fa-arrow-circle-left fa-3x" aria-hidden="true" />
      <Section>
        <span className="art_type">{art_type}</span>
        <span className="title">{title}</span>
      </Section>
      <span className="invisible"></span>
    </Container>
  );
};

export default Header;