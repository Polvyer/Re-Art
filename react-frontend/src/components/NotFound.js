import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Context
import { UserContext } from '../context/UserContext';

const Container = styled.div`
    .back-to-home {
      color: white;
    }
  `;

const NotFound = () => {

  // Context
  const { setNavTitle } = useContext(UserContext);

  // Changes navbar title
  useEffect(() => {
    setNavTitle('Error');
  }, [setNavTitle]);
  
  return (
    <Container className="page-wrap d-flex flex-row align-items-center">
      <div className="container">
          <div className="row justify-content-center">
              <div className="col-md-12 text-center">
                  <span className="display-1 d-block">404</span>
                  <div className="mb-4 lead">The page you are looking for was not found.</div>
                  <Link to="/posts" className="btn btn-link back-to-home">Back to Home</Link>
              </div>
          </div>
      </div>
    </Container>
  )
};

export default NotFound;