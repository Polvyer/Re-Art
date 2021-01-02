import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import search from '../images/navIcons/search.svg'
import x from '../images/navIcons/x.svg'
import person_plus_fill from '../images/navIcons/person-plus-fill.svg'
import house_door_fill from '../images/navIcons/house-door-fill.svg'
import file_earmark_arrow_up_fill from '../images/navIcons/file-earmark-arrow-up-fill.svg'
import person_circle from '../images/navIcons/person-circle.svg'
import bell_fill from '../images/navIcons/bell-fill.svg'
import three_dots_vertical from '../images/navIcons/three-dots-vertical.svg'

const Nav = styled.nav`
  color: white;
  background: linear-gradient(
    to bottom,
    rgba(4, 4, 4, 1),
    rgba(28, 24, 52, 1)
  );
`;

const Search = styled.div`
  cursor: pointer;
`;

const InvisibleSearch = styled.div`
  visibility: hidden;
`;

const DisabledIcon = styled.img`
  width: 1.7em;
  height: 1.7em;
  filter: invert(84%) sepia(45%) saturate(640%) hue-rotate(51deg) brightness(103%) contrast(98%);
`;

const Icon = styled.img`
  width: 1.7em;
  height: 1.7em;
  filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(43deg) brightness(102%) contrast(100%);
`;

const Title = styled.h4`
  color: #FFFFFF;
  font-family: 'Merriweather';
  font-size: 2rem;
  font-weight: 400;
`;

const Navbar = ({ toggleSidebar, sidebarActive, user }) => {

  const loggedInIcons = [
    { href: "/", src: house_door_fill, alt: "home" },
    { href: "/users/new", src: file_earmark_arrow_up_fill, alt: "post" },
    { href: "/", src: person_circle, alt: "portfolio" },
    { href: "/", src: bell_fill, alt: "notifications" },
    { href: "/", src: three_dots_vertical, alt: "more" },
  ];

  const loggedOutIcons = [
    { href: "/", src: house_door_fill, alt: "home" },
    { href: "/", src: person_circle, alt: "login" },
    { href: "/users/new", src: person_plus_fill, alt: "register" },
  ];

  const icons = user ? [...loggedInIcons] : [...loggedOutIcons];

  return (
    <Nav className="navbar navbar-expand-lg justify-content-between">
      <Search onClick={toggleSidebar} className="navbar-brand">
        {sidebarActive ? <Icon src={x} alt="search" /> : <Icon src={search} alt="search" />}
      </Search>
      <Title className="navbar-text">
        Re:Art
      </Title>
      <div>
        {icons.map(icon => {
          return (
            <Link key={icon.alt} to={icon.href} className="navbar-brand">
              <Icon src={icon.src} alt={icon.alt} />
            </Link>
          );
        })}
      </div>
    </Nav>
  );
};

export default Navbar;