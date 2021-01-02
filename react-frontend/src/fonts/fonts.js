import { createGlobalStyle } from 'styled-components'

import Merriweather from './Merriweather/Merriweather-Bold.ttf'
import Open_Sans from './Open_Sans/OpenSans-Regular.ttf'

export default createGlobalStyle`
  @font-face {
    font-family: 'Merriweather';
    src: url(${Merriweather}) format('ttf');
  }
  @font-face {
    font-family: 'Open Sans';
    src: url(${Open_Sans}) format('ttf');
  }
`;

