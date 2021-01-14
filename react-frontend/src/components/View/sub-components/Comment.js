import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Components
import Bubble from './Bubble';

// Helper functions
import { decideIcon } from '../../../services/decideIcon';

const Content = styled.div`
  background: linear-gradient(
    to bottom,
    #e87477,
    #df96cf
  );
  width: 90%;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  position: relative;
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

const Likes = styled.div`
  position: absolute;
  top: 20%;
  left: 10px;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;

  .likes {
    color: white;
  }
`

const LikeButtons = styled.div`
  display: flex;
  flex-direction: column;

  .fa {
    color: black;
    position: relative;
    ::after {
      content: '';
      display: inline-block;
      background-color: white;
      height: 90%;
      width: 90%;
      position: absolute;
      right: 0.6px;
      border-radius: 100px;
      z-index: -1;
    }
  }
`;

const Comment = ({ comment }) => {

  // Get poster's icon
  const icon = decideIcon(comment.poster.icon);

  return (
    <div>
      <Content>
        <Likes>
          <LikeButtons>
            <i className="fa fa-arrow-circle-up fa-lg" aria-hidden="true"></i>
            <i className="fa fa-arrow-circle-down fa-lg" aria-hidden="true"></i>
          </LikeButtons>
          <span className="likes">{comment.likes}</span>
        </Likes>
        <Link to={`/users/${comment.poster._id}`}><Icon icon={{ type: icon }} /></Link>
        <Bubble description={comment.description} />
      </Content>
    </div>
  );
};

export default Comment;