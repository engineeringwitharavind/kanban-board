import { createGlobalStyle } from 'styled-components';
import { COLORS } from '@constants';

const GlobalStyles = createGlobalStyle`  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --reach-dialog: 1;
  }

  html,
  body {
    color: ${COLORS.text};
    background: ${COLORS.background};
    line-height: 1.5;
  	text-rendering: optimizeSpeed;
	  -webkit-font-smoothing: antialiased;
  }

  html,
  body,
  #root {
    height: 100%;
    min-width: 300px;
    font-family: "Gill Sans MT", sans-serif;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  h1 {
    font-size: 1.6rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.4rem;
  }

  h4 {
    font-size: 1.3rem;
  }

  h5 {
    font-size: 1.2rem;
  }

  h6 {
    font-size: 1.1rem;
  }

  ul,
  ol {
    list-style: none;
  }

  a,
  a:hover,
  a:active,
  a:focus {
    text-decoration: none;
    font: inherit;
  }

  #root {
    isolation: isolate;
  }
`;

export default GlobalStyles;
