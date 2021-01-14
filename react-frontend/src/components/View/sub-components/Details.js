import React from 'react';
import styled from 'styled-components';

// Components
import Poster from './Poster';
import Image from './Image';
import Summary from './Summary';
import Buttons from './Buttons';

const Container = styled.div`
  background-color: #3c545c;
  border-radius: 10px;
  padding: 10px;
  min-height: 70vh;
  flex: 1;
  flex-basis: 530px;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  box-shadow: 0 0 10px black;
  display: flex;
  flex-direction: column;
`;

// Date
const Time = styled.figcaption`
  color: white;
`;

const Details = ({ data }) => {

  return (
    <Container>
      <Poster icon={data.poster.icon} owner={data.poster.owner} _id={data.poster._id} />
      <Image image={data.image.location} owner={data.poster.owner} />
      <Summary summary={data.summary} />
      <Time className="figure-caption text-right">{new Date(data.date_posted).toDateString()}</Time>
      <Buttons priv={data.private} _id={data.poster._id} />
    </Container>
  );
};

export default Details;