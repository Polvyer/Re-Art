import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Navbar icons
import search from '../images/navIcons/search.svg'
import x from '../images/navIcons/x.svg'
import person_plus_fill from '../images/navIcons/person-plus-fill.svg'
import house_door_fill from '../images/navIcons/house-door-fill.svg'
import file_earmark_arrow_up_fill from '../images/navIcons/file-earmark-arrow-up-fill.svg'
import person_circle from '../images/navIcons/person-circle.svg'
import bell_fill from '../images/navIcons/bell-fill.svg'
import box_arrow_right from '../images/navIcons/box-arrow-right.svg';

const Nav = styled.nav`
  color: white;
  background: linear-gradient(
    to bottom,
    rgba(4, 4, 4, 1),
    rgba(28, 24, 52, 1)
  );
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .Notifications {
    cursor: no-drop;
  }

  .nav-search {
    transform: translateY(-0.1em);
  }

  .nav-icons {
    flex-grow: 1;
    text-align: right;
  }
`;

const Search = styled.div`
  cursor: pointer;
`;

// Highlights (in green) the current navbar icon the user is on
const ActiveIcon = styled.img`
  width: 1.7em;
  height: 1.7em;
  filter: invert(84%) sepia(45%) saturate(640%) hue-rotate(51deg) brightness(103%) contrast(98%);
`;

// Standard (white) navbar icon
const Icon = styled.img`
  width: 1.7em;
  height: 1.7em;
  filter: invert(100%) sepia(100%) saturate(2%) hue-rotate(43deg) brightness(102%) contrast(100%);

  @media screen and (max-width: 300px) {
    width: 1.6em;
    height: 1.6em;
  }
`;

const Title = styled.h4`
  color: #FFFFFF;
  font-family: 'Merriweather';
  font-size: 2rem;
  font-weight: 400;
`;

const Navbar = ({ toggleSidebar, sidebarActive, user, navTitle, setShowLogoutModal }) => {

  const loggedInIcons = [
    { href: "/", src: house_door_fill, alt: "Home, Search Results" },
    { href: "/posts/new", src: file_earmark_arrow_up_fill, alt: "Upload Your Image, Ask For Feedback, Finalize Your Post" },
    { href: `/users/${user ? user._id : null}`, src: person_circle, alt: "Your Portfolio, Editing Portfolio" },
    { href: "#", src: bell_fill, alt: "Notifications" },
  ];

  const loggedOutIcons = [
    { href: "/", src: house_door_fill, alt: "Home, Search Results" },
    { href: "/session/new", src: person_circle, alt: "Login" },
    { href: "/users/new", src: person_plus_fill, alt: "Sign Up" },
  ];

  // Display specific icons based on whether a user is logged in
  const icons = user ? [...loggedInIcons] : [...loggedOutIcons];

  // Determines whether to show search icon
  let searchClasses = "navbar-brand nav-search";
  if ((navTitle !== "Home") && (navTitle !== "Search Results")) {
    searchClasses = "navbar-brand invisible";
  }

  return (
    <Nav className="navbar navbar-expand-lg">
      <Search onClick={toggleSidebar} className={searchClasses} >
        {sidebarActive ? <Icon src={x} alt="search" /> : <Icon src={search} alt="search" />}
      </Search>
      <Title className="navbar-text nav-text">
        {navTitle}
      </Title>
      <div className="nav-icons">
        {icons.map(icon => {
          return (
            <Link key={icon.alt} to={icon.href} className="navbar-brand">
              {icon.alt.includes(navTitle) ? <ActiveIcon src={icon.src} alt={icon.alt} /> : <Icon className={icon.alt} src={icon.src} alt={icon.alt} />}
            </Link>
          );
        })}
        {user ? 
        <div role="button" className="navbar-brand">
          <Icon onClick={setShowLogoutModal.bind(null, true)} src={box_arrow_right} alt="Logout" />
        </div> : null }
      </div>
    </Nav>
  );
};

export default Navbar;