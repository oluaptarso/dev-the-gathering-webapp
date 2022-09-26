import { createGlobalStyle } from 'styled-components';

export const Globals = createGlobalStyle`
  // this is the shared style
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Share Tech', sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: white;
    background: rgb(11, 30, 62);
    background: linear-gradient(167deg, rgba(11, 30, 62, 1) 0%, rgba(18, 45, 90, 1) 33%, rgba(143, 82, 245, 1) 66%, rgba(56, 251, 219, 1) 100%);  
  }

  * {
    box-sizing: border-box;
  }

  // anything else you would like to include
`;

export default Globals;
