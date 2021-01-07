import React from 'react';
import styled from 'styled-components';

// Default Avatar
import DefaultAvatar from '../images/userIcons/avatar.svg';
import Picture from '../images/placeholders/S1e3_mabel_new_wax_figure.png';

// Helper functions
import { decideIcon } from '../services/decideIcon';

const InfoContainer = styled.div`
  margin: 0 auto;
  width: 78%;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
  background-color: #3c545c;
`;

const Avatar = styled.img`
  width: 15em;
  display: block;
  margin: 0 auto;
  margin-bottom: 3px;
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
  border-radius: 30px;
  background-color: #fca404;
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 0 2px black;
  :hover {
    transform: translateY(-3px);
  }
  :focus {
    outline: none;
    box-shadow: 0 0 2px black;
  }
  :active {
    transform: translateY(-1px);
  }
`;

const EditIcon = styled.i`
  position: relative;
  top: 2px;
`;

const Info = ({ info }) => {

  const icon = decideIcon(info.icon);

  return (
    <InfoContainer className="px-3 mt-5 py-3">
      <div>
        <Avatar src={Picture} alt="Avatar" />
        <TextContainer>
          <div className="username">@{info.owner}</div>
          <div>
            <Icon src={icon}/><span className="icon"></span>
          </div>
          {info.biography ? <div className="biography">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p</div> : <div>(Biography not given)</div>}
        </TextContainer>
      </div>
      <EditButton className="btn"><EditIcon className="fa fa-pencil-square-o" aria-hidden="true"></EditIcon> Edit Info</EditButton>
    </InfoContainer>
  )
};

export default Info;