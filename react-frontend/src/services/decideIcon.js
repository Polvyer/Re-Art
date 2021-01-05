// Profile icons
import Anonymous from '../images/userIcons/anonymous.svg';
import Hobbyist from '../images/userIcons/hobbyist.png';
import Professional from '../images/userIcons/professional.png';
import Student from '../images/userIcons/student.png';

// Converts text to img icon
export function decideIcon(text)  {

  let icon;
  
  switch(text) {
    case 'Hobbyist':
      icon = Hobbyist;
      break;
    case 'Student':
      icon = Student;
      break;
    case 'Professional':
      icon = Professional;
      break;
    default:
      icon = Anonymous;
      break;
  }

  return icon;
}