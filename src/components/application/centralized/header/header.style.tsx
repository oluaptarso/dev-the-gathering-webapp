import styled from "styled-components";

const StyledHeader = styled.header`
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  height: 57px;
`;

export const StyledDropdownMenu = styled.ul`
  background: #38fbdb !important;
  box-shadow: 0 4px 30px rgba(56, 251, 219, .4);
  

  a {
    color:#112b57 !important;
    &:hover{
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
`;

export default StyledHeader;