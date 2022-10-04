import { Flex } from 'src/styles/mixins/flex';
import { Glass } from 'src/styles/mixins/glass';
import styled from 'styled-components';

export const StyledForm = styled.form`
  min-width: 330px;
  // min-height: 450px;
  padding: 15px;
  color: #3c398f;
  margin-top: 150px;
  @media (max-width: 600px) {
    margin-top: 50px;
    }
  ${Flex({ direction: 'column' })}

  ${Glass}

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
