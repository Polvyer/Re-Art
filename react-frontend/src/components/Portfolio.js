import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

// Context Provider
import { UserContext } from '../context/UserContext';

// Components
import Posts from './Posts';
import Info from './Info';

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

  // Context
  const { user, setNavTitle } = useContext(UserContext);

  // URI parameters (/users/:userid)
  const { userid } = useParams();

  // Used to redirect to Not Found for when profile doesn't exist
  const history = useHistory();

  // Changes navbar title
  useEffect(() => {
    if (user && user._id === userid) {
      setNavTitle('Your Portfolio');
    } else {
      setNavTitle('Portfolio');
    }
  }, [user, userid, setNavTitle]);

  // Get list of user's posts from the database
  useEffect(() => {
    async function fetchPosts() {
      try {
        // GET request to /users/:userid (:userid => portfolio id)
        const response = await axios.get(`http://localhost:5000/users/${userid}`, { withCredentials: true });
        setData(response.data);
      } catch(err) {
        // No user found, redirect to Not Found
        history.push('/404.html');
      }
    };
    fetchPosts();
  }, [userid, history]);

  // Extract posts and info
  const { posts, ...info } = data

  console.log(posts);

  return (
    <div id="container">
      <Info info={info} />
      <Paragraph className="pl-3">Recent Posts</Paragraph>
      <Posts posts={posts} />
    </div>
  )
};

export default Portfolio;