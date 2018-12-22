import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    
    h1,h2,h3, h4, h5, h6 {
      font-family: 'Hind', sans-serif;
    }
  }

  .ui.blue.button, .ui.blue.label {
    background-color: #295ba5 !important;
  }
  .ui.primary.button {
      background-color: #1ca086;
  }

  a {
    color: #1ca086;
  }
`;

export default GlobalStyles;
