import { createGlobalStyle } from 'styled-components'

import Merriweather from './Merriweather/Merriweather-Bold.ttf'

export default createGlobalStyle`
  @font-face {
    font-family: 'Merriweather';
    src: url(${Merriweather}) format('ttf');
  }
`;

