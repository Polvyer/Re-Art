import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

// Default Avatar
import DefaultAvatar from '../images/userIcons/default.png';

// Helper functions
import { decideIcon } from '../services/decideIcon';

// Context
import { UserContext } from '../context/UserContext';

const InfoContainer = styled.div`
  margin: 0 auto;
  width: 78%;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
  background-color: #3c545c;
`;

const Avatar = styled.img`
  display: block;
  margin: 0 auto;
  margin-bottom: 3px;
  max-width: 40%;
  height: auto;

  @media screen and (max-width: 700px) {
    max-width: 80%;
  }
`;

const TextContainer = styled.div`
  text-align: center;
  color: white;
  font-size: 1.4rem;
  .username {
    font-weight: 700;
  }
  div .icon {
    font-weight: 500;
  }
  .biography {
    font-size: 1.2rem;
    color: white;
    font-weight: 100;
    line-height: 2.5rem;
  }
`;

const Icon = styled.img`
  width: 1.8em;
  position: relative;
  top: 2px;
`;

const EditButton = styled.button`
  display: block;
  margin: 0 auto;
  margin-top: 5px;
  height: 50px;
  border-radius: 40px;
  background-color: #fca404;
  font-size: 1.5rem;
  color: white;
  box-shadow: 0px 2px 5px black;
  :hover {
    transform: translateY(-3px);
  }
  :focus {
    outline: none;
    box-shadow: 0px 2px 5px black;
  }
  :active {
    transform: translateY(-1px);
  }
`;

const EditIcon = styled.i`
  position: relative;
  top: 2px;
`;

const Info = ({ owner, info, showEditButton, setShowEditInfo }) => {

  // Context
  const { user, setNavTitle } = useContext(UserContext);

  // URI parameters (/users/:userid)
  const { userid } = useParams();

  // Changes navbar title
  useEffect(() => {
    if (user && user._id === userid) {
      // User's portfolio
      setNavTitle('Your Portfolio');
    } else {
      if (owner) { // data.owner => username
        // Someone else's portfolio
        setNavTitle(`${owner}'s Portfolio`);
      } else {
        // No one's portfolio
        setNavTitle('Not Found');
      }
    }
  }, [user, userid, setNavTitle, owner]);

  // Get icon to display
  const icon = decideIcon(info.icon);

  return (
    <InfoContainer className="px-3 mt-5 py-3">
      <div>
        {showEditButton ? <Avatar className="img-fluid" src={(user.avatar && user.avatar.location) || DefaultAvatar} alt="Avatar" /> : <Avatar className="img-fluid" src={(info.avatar && info.avatar.location) || DefaultAvatar} alt="Avatar" />}
        <TextContainer>
          <div className="username">@{info.owner}</div>
          <div>
            <Icon src={icon}/><span className="icon"></span>
          </div>
          {(info.biography && info.biography.trim()) ? <div className="biography">{info.biography}</div> : <div>(Biography not given)</div>}
        </TextContainer>
      </div>
      {showEditButton ? <EditButton onClick={setShowEditInfo.bind(null, true)} className="btn"><EditIcon className="fa fa-pencil-square-o" aria-hidden="true"></EditIcon> Edit Info</EditButton> : null}
    </InfoContainer>
  )
};

export default Info;