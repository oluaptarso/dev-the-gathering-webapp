import { Flex } from 'src/styles/mixins/flex';
import styled from 'styled-components';

export const StyledForm = styled.form`
  min-width: 330px;
  // min-height: 450px;
  padding: 15px;
  color: #3c398f;
  ${Flex({ direction: 'column' })}

  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  h1 {
    color: white;
  }

  .form-floating:focus-within {
    z-index: 2;
  }

  input {
    background-color: rgba(255, 255, 255, 0.5);
    color: #3c398f;
    border-color: #6f48cd;
    :focus {
      box-shadow: none;
      border-color: #6f48cd;
      color: #6f48cd;
      background-color: rgba(255, 255, 255, 0.8);
    }
  }

  button {
    height: 45px;
  }
`;

export const FormErrorList = styled.ul`
  text-align:left;
  list-style:none;
  padding-left:0.5rem;
  color:#ff81ac;

  li {
    min-height: 24px;
  }
`;