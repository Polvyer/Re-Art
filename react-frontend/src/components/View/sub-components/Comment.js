import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

// Components
import Bubble from './Bubble';
import ImageModal from '../../Posts/sub-components/ImageModal';

// Context
import { UserContext } from '../../../context/UserContext';

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
  position: relative;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  top: 10px;
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
    cursor: pointer;
    color: black;
    position: relative;
    ::after {
      content: '';
      display: inline-block;
      height: 90%;
      width: 90%;
      position: absolute;
      right: 0.6px;
      border-radius: 100px;
      z-index: -1;
    }
  }

  .like {
    ::after {
      /* Adjust background-color with like.color prop */
      background-color: ${props => props.like.color};
    }
  }

  .dislike {
    ::after {
      /* Adjust background-color with dislike.color prop */
      background-color: ${props => props.dislike.color};
    }
  }
`;

const Time = styled.span`
  position: absolute;
  bottom: 2px;
  right: 2px;
`;

const ImageContainer = styled.div`
  height: 7em;
  width: fit-content;
  position: relative;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const Delete = styled.button`
  position: absolute;
  top: -0.6em;
  z-index: 1;
  right: 1em;
  padding: 3px 5px;
`;

const Comment = ({ comment, listOfComments, setListOfComments, setCommentCount, commentCount, setErrors }) => {

  // State
  const [ showModal, setShowModal ] = useState(false);
  const [ modalInfo, setModalInfo ] = useState({
    image: null,
    caption: null
  });
  const [ disableButton, setDisableButton ] = useState(false);
  const [ disableLiking, setDisableLiking ] = useState(false);

  // Context
  const { user, setUser } = useContext(UserContext);

  // Extract commentid from params
  const { postid } = useParams();

  // Used to redirect user to login page when their session expired
  const history = useHistory();

  // Toggle full-size display of image
  const toggleModal = (e) => {
    if (showModal) {
      setShowModal(false);
    } else {
      setModalInfo({
        image: e.target.src,
        caption: e.target.alt,
      });
      setShowModal(true);
    }
  };

  // Like/dislike a comment
  const like = async (status, commentid, e) => {

    // Disable liking buttons
    setDisableLiking(true);
    
    const formData = qs.stringify({
      'status': status
    });

    const config = {
      withCredentials: true,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    };

    try {
      const response = await axios.put(`http://localhost:5000/posts/${postid}/comments/${commentid}`, formData, config);

      // Enable liking buttons
      setDisableLiking(false);

      // Successful
      if (response.status === 200) {
        // Find comment's index
        const index = listOfComments.map(comment => comment._id).indexOf(response.data._id);

        // Remove comment and insert updated comment
        const newListOfComments = [ ...listOfComments ];
        newListOfComments.splice(index, 1, response.data);
        setListOfComments(newListOfComments);
      }

    } catch(err) {

      // Enable liking buttons
      setDisableLiking(false);

      if (err.response) { // Intentional error
        if (err.response.status === 401) { // Log out user
          setUser(null);
          history.push('/session/new');
        } else {
          setErrors(err.response.data);
        }
      } else { // Server down most likely
        setErrors(['Oops! Something went wrong, please try again.']);
      }
    }
  };

  // Delete comment
  const deleteComment = async (commentid, e) => {
    
    // Disable delete button
    setDisableButton(true);

    try {
      const response = await axios.delete(`http://localhost:5000/posts/${postid}/comments/${commentid}`, { withCredentials: true });

      // Successful
      if (response.status === 200) {
        // Find comment's index
        const index = listOfComments.map(comment => comment._id).indexOf(commentid);

        // Remove comment from client
        const newListOfComments = [ ...listOfComments ];
        newListOfComments.splice(index, 1);
        setListOfComments(newListOfComments);
        setCommentCount(commentCount - 1);
      }
    } catch(err) {

      // Enable delete button
      setDisableButton(false);

      if (err.response) { // Intentional error
        if (err.response.status === 401) { // Log out user
          setUser(null);
          history.push('/session/new');
        } else {
          setErrors(err.response.data);
        }
      } else { // Server down most likely
        setErrors(['Oops! Something went wrong, please try again.']);
      }
    }
  };

  // Get poster's icon
  const icon = decideIcon((comment.poster && comment.poster.icon));

  return (
    <div>
      <Content>
        <Section>
          <Likes>
            {user ? <LikeButtons like={(comment.status && comment.status === 'like') ? { color: '#ff4501' } : { color: 'white' } } dislike={(comment.status && comment.status === 'dislike') ? { color: '#ff4501' } : { color: 'white' } }>
              <i disabled onClick={disableLiking ? console.log.bind(null, 'like') : like.bind(null, 'like', comment._id)} className="fa fa-arrow-circle-up fa-lg like" aria-hidden="true"></i>
              <i onClick={disableLiking ? console.log.bind(null, 'dislike') : like.bind(null, 'dislike', comment._id)} className="fa fa-arrow-circle-down fa-lg dislike" aria-hidden="true"></i>
            </LikeButtons> : null}
            <span className="likes">{comment.likes}</span>
          </Likes>
          {comment.poster.icon !== 'Anonymous' ? <Link to={`/users/${comment.poster && comment.poster._id}`}><Icon icon={{ type: icon }} /></Link> : <Icon icon={{ type: icon }} /> }
          <Bubble description={comment.description} />
          <Time>{new Date(comment.date_posted).toDateString()}</Time>
          {(user && user._id === (comment.poster && comment.poster._id)) ? <Delete disabled={disableButton} className="btn btn-danger" role="button" onClick={deleteComment.bind(null, comment._id)}>Delete</Delete> : null}
        </Section>
        {showModal ? <ImageModal modalInfo={modalInfo} toggleModal={toggleModal} /> : null}
        {(comment.attachment && comment.attachment.location) ? <ImageContainer className="comment-img">
                                                                <Image onClick={toggleModal} src={comment.attachment.location} className="img-fluid" />
                                                               </ImageContainer> : null}
      </Content>
    </div>
  );
};

export default Comment;