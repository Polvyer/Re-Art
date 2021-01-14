import styled from 'styled-components';

// Main container (holds everything together)
const ContentContainer = styled.div`
  margin: 0 auto;
  width: 85%;
  background-color: #3c545c;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
`;

// Overrides the ugly input styles
const CustomInput = styled.label`
  margin-top: 10px;
  max-width: 13em;
  margin-bottom: 0;
  position: relative; // For pencil icon
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Actual input
const HiddenInput = styled.input`
  display: none;
`;

// Pencil icon (in the top-right corner of the avatar)
const Pencil = styled.img`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  width: 2em;
  cursor: pointer;
`;

// Avatar
const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    opacity: 0.7;
  }
`;

// Username container
const TextContainer = styled.div`
  text-align: center;
  color: white;
  font-size: 1.4rem;

  // Username
  .username {
    font-weight: 700;
  }
`;

// 'Artist type' label
const SelectLabel = styled.label`
  width: 85%;
  display: block;
  margin: 0 auto;
  font-size: 1.5rem;
  color: white;
  font-weight: 700;
`;

// Container for 'Artist type' buttons
const SelectButtons = styled.div`
  width: 90%;
  margin: 5px auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;

  // Little icons
  img {
    width: 20px;
    filter: invert(99%) sepia(0%) saturate(75%) hue-rotate(331deg) brightness(122%) contrast(100%);
  }
`;

// 'Artist type' button (the one selected)
const ActiveLabel = styled.label`
  font-size: 1.4rem;
  color: white;
  box-shadow: 0px 2px 5px black;
  padding: 17px 20px;
  flex-basis: 200px;
  border-radius: 20px;
  background-color: #360844;
  margin-bottom: 10px;
  margin-top: 10px;
  :hover {
    color: white;
    background-color: #360844;
  }
`;

// 'Artist type' buttons
const Label = styled.label`
  font-size: 1.4rem;
    color: white;
    box-shadow: 0px 2px 5px black;
    padding: 17px 20px;
    flex-basis: 200px;
    border-radius: 20px;
    background-color: #70118d;
    margin-bottom: 10px;
    margin-top: 10px;
    :hover {
      color: white;
      background-color: #360844;
    }
`;

// 'Biography' container
const FormGroup = styled.div`
  width: 85%;
  margin: 10px auto;
  margin-top: 20px;
  font-size: 1.5rem;
  color: white;
  font-weight: 700;

  // For biography
  textarea {
    border: 1px solid black;
    :active, :focus {
      border: 1px solid black;
    }
  }
`;

// Button container
const FooterButtons = styled.div`
  width: 85%;
  margin: 10px auto;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  color: white;
  flex-wrap: wrap;

  // Actual buttons
  button {
    flex-basis: 200px;
    margin: 10px;
    padding: 15px;
    border-radius: 50px;
    font-size: 1.3rem;
    box-shadow: 0px 2px 5px black;
  }

  @media screen and (max-width: 646px) {
    .btn-success {
      order: -1;
    }
  }
  
  @media screen and (max-width: 290px) {
    button {
      font-size: 1.2rem;
    }
  }
`;

// Loading button styles
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  // Spinner
  span {
    margin-right: 5px;
  }
`;

export {
  ContentContainer,
  CustomInput,
  HiddenInput,
  Pencil,
  Image,
  TextContainer,
  SelectLabel,
  SelectButtons,
  ActiveLabel,
  Label,
  FormGroup,
  FooterButtons,
  Button,
};