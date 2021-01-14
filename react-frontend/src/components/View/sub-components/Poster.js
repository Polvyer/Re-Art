import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Helper functions
import { decideIcon } from '../../../services/decideIcon';

const Container = styled.div`
  display: flex;
  align-items: center;

  // Username
  .username {
    color: white;
    :hover {
      text-decoration: underline;
    }
  }
`;

const Icon = styled.div`
  display: inline-block;
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  background-color: white;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin-right: 5px;

  /* Adjust background-image with icon.type prop */
  background-image: url(${props => props.icon.type});
`;

const Poster = ({ icon, owner, _id }) => {

  // Get owner's icon
  const usericon = decideIcon(icon);

  return (
    <Container>
      <Icon icon={{ type: usericon }} />
      <Link to={`/users/${_id}`} className="username">{owner}</Link>
    </Container>
  );
};

export default Poster;