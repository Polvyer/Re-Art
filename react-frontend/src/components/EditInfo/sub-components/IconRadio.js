import React from 'react';

// Styles
import { Label } from '../Styles';

// Helps visually indicate a button is selected (since we manually implemented radio buttons)
const IconRadio = ({ icon, handleFormChanges }) => {
  return (
    <Label name="icon" value={icon.alt} onClick={handleFormChanges} className="btn">
      <input type="radio" value={icon.alt} name="icon" /><img src={icon.src} alt={icon.alt} /> {icon.alt}
    </Label>
  );
};

export default IconRadio;