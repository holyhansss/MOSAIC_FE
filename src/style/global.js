import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Spoqa Han Sans Neo', sans-serif; 
  }
  
  body {
    overflow-y: scroll;
  }
  p {
    font-size: 18px;
  }
`;

export default GlobalStyle;
