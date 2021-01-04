import React, { useContext, useEffect } from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';

// Context Provider
import { UserContext } from '../context/UserContext';

const Placeholder = styled.div`
  font-size: 40px;
  font-weight: 600;
  text-align: center;
`;

const Portfolio = () => {

  const { user, setUser, setNavTitle } = useContext(UserContext);

  const { userid } = useParams();

  console.log(userid)

  // Changes navbar title
  useEffect(() => {
    if (user && user._id === userid) {
      setNavTitle('Your Portfolio');
    } else {
      setNavTitle('Portfolio');
    }
  }, []);

  return (
    <Placeholder>
      Portfolio
    </Placeholder>
  )
};

export default Portfolio;