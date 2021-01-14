import React from 'react';
import styled from 'styled-components';

// Components
import Comment from './Comment';

const Container = styled.div`
  flex-basis: 25em;
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: auto;

  @media screen and (min-height: 1024px) {
    flex-basis: 40em;
  }
`;

const List = ({ listOfComments }) => {
  return (
    <Container>
      {listOfComments.map(comment => <Comment key={comment._id} comment={comment} />)}
    </Container>
  )
}

export default List;