import React, { useContext } from 'react'
import styled from 'styled-components'
import { UserContext } from '../context/UserContext'
import Dummy from '../images/placeholders/dummy.png'
import Anonymous from '../images/userIcons/anonymous.svg'
import Hobbyist from '../images/userIcons/hobbyist.png'
import Professional from '../images/userIcons/professional.png'
import Student from '../images/userIcons/student.png'
import Chat from '../images/utilityIcons/chat-right-text-fill.svg'

const Deck = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 80%;
`;

const Card = styled.div`
  background-color: #3c545c;
  flex: 1;
  flex-basis: 18em; /* Important */
  border-radius: 10px;
  cursor: pointer;
`;

const SpeechBubble = styled.p`
  text-align: center;
  background: #FFF;
  font-size: 0.9rem; /* Important */
  padding: 1.3em; /* Important */
  width: 100%; /* Important */
  position:relative;
  border-radius: 10px;
  ::before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid #FFF;
    border-right: 10px solid transparent;
    border-top: 10px solid #FFF;
    border-bottom: 10px solid transparent;
    left: 32px;
    bottom: -15px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Icon = styled.div`
  display: inline-block;
  width: 2.5em; /* Important */
  height: 2.5em; /* Important */
  border-radius: 50%;
  background-color: white;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  /* Adjust background-image icon with icon.type */
  background-image: url(${props => props.icon.type});
`;

const CommentSection = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
`;

const CommentIcon = styled.div`
  width: 2.5em; /* Important */
  height: 2.5em; /* Important */
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  filter: invert(100%) sepia(5%) saturate(7500%) hue-rotate(188deg) brightness(113%) contrast(90%);
  align-self: flex-end;

  /* Adjust background-image icon with icon.type */
  background-image: url(${props => props.icon.type});
`;

const Number = styled.div`
  font-size: 1.5rem;
  color: white;
  margin-left: 5px;
  align-self: flex-start;
`;

const Posts = ({ posts }) => {

  const user = useContext(UserContext);

  return (
    <Deck className="mx-auto my-5">
      {posts.map(post => {
        return (
          <Card className="p-2 m-3">
            <img className="card-img-top" src={Dummy} alt="dummy" />
            <div className="pt-4 pb-1 px-3 clearfix">
              <SpeechBubble>Lorem ipsum dolor sit amet, consectetuer adipiscin</SpeechBubble>
              <Footer>
                <Icon icon={{ type: Anonymous }} />
                <CommentSection>
                  <CommentIcon icon={{ type: Chat }} />
                  <Number>8</Number>
                </CommentSection>
              </Footer>
            </div>
          </Card>
        );
      })}
    </Deck>
  );
};

export default Posts;