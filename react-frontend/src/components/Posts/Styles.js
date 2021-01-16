import styled from 'styled-components';

// Deck of cards
const Deck = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 90%; /* Important */
`;

// Post container
const Card = styled.div`
  background-color: #3c545c;
  flex: 1;
  flex-basis: 18em; /* Base size */
  flex-grow: 0.2; /* Prevents growing */
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

const ImageContainer = styled.div`
  height: 14em; /* Controls image height */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  transition: 0.3s;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const SpeechBubble = styled.p`
  flex: 1;
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

// Icon (user and comment), username and number of comments container
const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

// Separates user-related stuff from comment stuff
const Section = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;

  // Customize <Link>
  .username-link {
    :hover {
      text-decoration: underline;
      text-decoration-color: white;
    }
  }
`;

// User icon
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

// Username
const Name = styled.span`
  display: block; 
  font-size: 1.3rem;
  color: white;
  margin-left: 5px;
  align-self: center;

  @media screen and (max-width: 320px) {
    font-size: 0.9rem;
    transform: translateY(8px);
  }
  
  @media screen and (max-width: 280px) {
    font-size: 0.8rem;
    transform: translateY(9px);
  }
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

// Number of comments
const Number = styled.div`
  font-size: 1.5rem;
  color: white;
  margin-left: 5px;
  align-self: flex-start;
`;

// The Modal (background)
const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 3; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
`;

// Modal Content (image)
const ModalContent = styled.img`
  margin: auto;
  display: block;
  width: 80%;
  max-width: 500px;

  animation-name: zoom;
  animation-duration: 0.6s;

  /* Add Animation - Zoom in the Modal */
  @keyframes zoom {
    from {transform:scale(0)}
    to {transform:scale(1)}
  }

  /* 100% Image Width on Smaller Screens */
  @media only screen and (max-width: 700px){
    width: 100%;
  }
`;

// Caption of Modal Image (Image Text) - Same Width as the Image
const Caption = styled.div`
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;

  animation-name: zoom;
  animation-duration: 0.6s;

  /* Add Animation - Zoom in the Modal */
  @keyframes zoom {
    from {transform:scale(0)}
    to {transform:scale(1)}
  }
`;

// The Close Button
const Close = styled.span`
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;

  :hover, :focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }
`;

export {
  Deck,
  Card,
  ImageContainer,
  Image,
  SpeechBubble,
  CardFooter,
  Section,
  Icon,
  Name,
  CommentIcon,
  Number,
  Modal,
  ModalContent,
  Caption,
  Close
};