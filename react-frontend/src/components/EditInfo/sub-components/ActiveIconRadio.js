import React from 'react';

// Styles
import { ActiveLabel } from '../Styles';

// Helps visually indicate a button is selected (since we manually implemented radio buttons)
const ActiveIconRadio = ({ icon }) => {
  return (
    <ActiveLabel className="btn">
      <input type="radio" name="icon" /><img src={icon.src} alt={icon.alt} /> {icon.alt}
    </ActiveLabel>
  );
};

export default ActiveIconRadio;