import React from 'react';
import { Link } from 'react-router-dom'

// Styled Components
import { Card, SpeechBubble, CardFooter, Section, Icon, Name, CommentIcon, Number } from './PostStyles';

// Placeholder post image
import Dummy from '../images/placeholders/dummy.png';

// Comment icon
import Chat from '../images/utilityIcons/chat-right-text-fill.svg';

// Helper functions
import { decideIcon } from '../services/decideIcon';

const Post = ({ post }) => {

  const icon = decideIcon(post.poster.icon);
  
  return (
    <Card key={post._id} className="p-2 m-3">
      <img className="card-img-top" src={Dummy} alt="dummy" />
      <div className="pt-4 pb-1 px-3 clearfix">
        <SpeechBubble>{post.title}</SpeechBubble>
        <CardFooter>
          <Section>
            <Icon icon={{ type: icon }} />
            <Link to={`/users/${post.poster._id}`}><Name>{post.poster.owner}</Name></Link>
          </Section>
          <Section>
            <CommentIcon icon={{ type: Chat }} />
            <Number>8</Number>
          </Section>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Post;