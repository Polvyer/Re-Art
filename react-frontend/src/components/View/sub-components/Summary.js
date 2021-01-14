import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 10px;

  // More toggle
  .more {
    color: lightsteelblue;
    cursor: pointer;
    font-weight: bold;
  }
`;

const Summary = ({ summary }) => {

  const [ showMore, setShowMore ] = useState(false);
  const maxChar = 250; // Limit # of characters before we add a more toggle

  // Splits the amount of characters a user can see based on a more toggle
  let text = summary;
  if (!showMore && summary.length > maxChar) {
    text = summary.split('').splice(0, maxChar).join('');
  }

  return (
    <Container>
      <div className="summary">{text} {showMore ? <span onClick={setShowMore.bind(null, false)} className="more"> less</span> : ((summary.length > maxChar) ? <span onClick={setShowMore.bind(null, true)} className="more">more</span> : null)}</div>
    </Container>
  );
};

export default Summary;