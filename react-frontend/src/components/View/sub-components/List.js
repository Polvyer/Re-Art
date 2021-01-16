import React from 'react';
import styled from 'styled-components';

// Components
import Comment from './Comment';

const Container = styled.div`
  flex-basis: 25em;
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: auto;
  margin-bottom: 25px;

  @media screen and (min-height: 1024px) {
    flex-basis: 40em;
  }
`;

const List = ({ listOfComments, setListOfComments, setCommentCount, commentCount }) => {
  return (
    <Container>
      {listOfComments.map(comment => <Comment key={comment._id} comment={comment} listOfComments={listOfComments} setListOfComments={setListOfComments} commentCount={commentCount} setCommentCount={setCommentCount} />)}
    </Container>
  );
};

export default List;