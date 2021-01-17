import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// Styles
import { ImageContainer, Image, Card, SpeechBubble, CardFooter, Section, Icon, Name, CommentIcon, Number } from '../Styles';

// Placeholder post image
import Dummy from '../../../images/placeholders/dummy.png';

// Comment icon
import Chat from '../../../images/utilityIcons/chat-right-text-fill.svg';

// Helper functions
import { decideIcon } from '../../../services/decideIcon';

const Post = ({ post, toggleModal }) => {

  // Get the user's icon
  const icon = decideIcon(post.poster.icon);

  // Used to redirect to a specific post
  const history = useHistory();

  // Redirects user to the specific post page
  const viewPost = (postid, e) => { 
    if (e.target.tagName.toString() !== 'IMG' && e.target.tagName.toString() !== 'SPAN') {
      history.push(`/posts/${postid}`);
    }
  }
  
  return (
    <Card onClick={viewPost.bind(null, post._id)} id={post._id} key={post._id} className="p-2 m-3">
      <ImageContainer>
        <Image onClick={toggleModal} className="img-fluid" src={post.image || Dummy} alt={post.poster.owner} />
      </ImageContainer>
      <div className="pt-4 pb-1 px-3 clearfix content">
        <SpeechBubble>{post.title}</SpeechBubble>
        <CardFooter>
          <Section>
            <Icon icon={{ type: icon }} />
            {post.poster.icon !== 'Anonymous' ? <Link className="username-link" to={`/users/${post.poster._id}`}><Name>{post.poster.owner}</Name></Link> : null}
          </Section>
          <Section>
            <CommentIcon icon={{ type: Chat }} />
            <Number>{post.numberOfComments}</Number>
          </Section>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Post;