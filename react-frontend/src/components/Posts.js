import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { UserContext } from '../context/UserContext'

// Placeholder post image
import Dummy from '../images/placeholders/dummy.png'

// Profile icons
import Anonymous from '../images/userIcons/anonymous.svg'
import Hobbyist from '../images/userIcons/hobbyist.png'
import Professional from '../images/userIcons/professional.png'
import Student from '../images/userIcons/student.png'

// Comment icon
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
  flex-basis: 18em;
  border-radius: 10px;
  cursor: pointer;
`;

const SpeechBubble = styled.p`
  text-align: center;
  background: #FFF;
  font-size: 0.9rem;
  padding: 1.3em;
  width: 100%;
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

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Section = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
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

  /* Adjust background-image with icon.type prop */
  background-image: url(${props => props.icon.type});
`;

const Name = styled.div`
  font-size: 1.3rem;
  color: white;
  margin-left: 5px;
  align-self: center;
`;

const CommentIcon = styled.div`
  width: 2.5em;
  height: 2.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  filter: invert(100%) sepia(5%) saturate(7500%) hue-rotate(188deg) brightness(113%) contrast(90%);
  align-self: flex-end;

  /* Adjust background-image with icon.type prop */
  background-image: url(${props => props.icon.type});
`;

const Number = styled.div`
  font-size: 1.5rem;
  color: white;
  margin-left: 5px;
  align-self: flex-start;
`;

const Posts = ({ posts }) => {

  const { user, setUser, setNavTitle } = useContext(UserContext);

  // Changes navbar title
  useEffect(() => {
    setNavTitle('Home');
  }, []);

  return (
    <Deck className="mx-auto my-5">
      {posts.map(post => {
        return (
          <Card key={post._id} className="p-2 m-3">
            <img className="card-img-top" src={Dummy} alt="dummy" />
            <div className="pt-4 pb-1 px-3 clearfix">
              {console.log(post)}
              <SpeechBubble>{post.title}</SpeechBubble>
              <CardFooter>
                <Section>
                  <Icon icon={{ type: Anonymous }} />
                  <Name>Polvyer</Name>
                </Section>
                <Section>
                  <CommentIcon icon={{ type: Chat }} />
                  <Number>8</Number>
                </Section>
              </CardFooter>
            </div>
          </Card>
        );
      })}
    </Deck>
  );
};

export default Posts;