import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

// Context Provider
import { UserContext } from '../context/UserContext';

// Components
import Posts from './Posts/Posts';
import Info from './Info';
import EditInfo from './EditInfo/EditInfo';
import ScrollArrow from './ScrollArrow';
import Error from './Error';

const Paragraph = styled.p`
  width: 80%;
  margin: 0 auto;
  color: white;
  font-size: 1.4rem;
  font-weight: 800;
  position: relative;
  top: 50px;
`;

const Portfolio = () => {

  // State
  const [ data, setData ] = useState({ posts: [] });
  const [ showEditInfo, setShowEditInfo ] = useState(false);
  const [ errors, setErrors ] = useState([]);

  // Used to allow us to call scrollIntoView
  const errorRef = useRef(null);

  // Context
  const { user } = useContext(UserContext);

  // URI parameters (/users/:userid)
  const { userid } = useParams();

  // Used to redirect to Not Found for when profile doesn't exist
  const history = useHistory();

  // Get list of user's posts from the database
  useEffect(() => {
    async function fetchPosts() {
      try {
        // GET request to /users/:userid (:userid => portfolio id)
        const response = await axios.get(`/api/users/${userid}`, { withCredentials: true });
        setData(response.data);
      } catch(err) {
        if (err.response) {
          // No user found (most likely), redirect to Not Found
          history.push('/404.html');
        } else { // Server down most likely
          setErrors(['Oops! Something went wrong, please try again.']);
        }
      }
    };
    fetchPosts();
  }, [userid, history]);

  // Closes error
  const closeError = (index) => {
    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  };

  // Extract posts and info
  const { posts, ...info } = data

  // If user is logged in and user's portfolio, display edit button
  const showEditButton = (user && user._id === userid);

  const recentPosts = posts.slice().reverse();

  // Determines what content to render
  const renderContent = () => {
    if (showEditInfo) {
      return <EditInfo data={data} setData={setData} info={info} userid={userid} setShowEditInfo={setShowEditInfo} />
    }
    return (
      <div id="container">
        {errors.map((error, index) => <Error key={index} closeError={closeError} error={error} index={index} errorRef={errorRef} />)}
        <Info owner={data.owner} setShowEditInfo={setShowEditInfo} info={info} showEditButton={showEditButton} />
        <Paragraph className="pl-3">Recent Posts</Paragraph>
        <Posts posts={recentPosts} />
      </div>
    );
  };

  return (
    <div id="container">
      {renderContent()}
      <ScrollArrow />
    </div>
  );
};

export default Portfolio;