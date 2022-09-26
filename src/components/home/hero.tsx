import Button from 'src/components/Button';
import { Glitch } from 'src/styles/animations';
import styled from 'styled-components';

const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 800px;

    @media (max-width: 600px) {
      width: 100%;
      flex-direction: column;
    }
  }
`;

const GlitchedTitle = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 5rem;
  position: relative;
  &:after {
    content: attr(data-text);
    //display: none;
    left: 0;
    position: absolute;
    text-shadow: 2px 1px #67e3f3, -2px -2px #f8ef02;
    top: 0;
    width: 100%;
    z-index: 2;
    animation: ${Glitch} 2s linear infinite alternate;
    display: block;
  }
`;

const ApplicationDescription = styled.p`
  margin: 2rem 0 4rem 0;
  line-height: 1.5;
  font-size: 1.5rem;
`;

const NeonSubtitle = styled.h3`
  text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #38fbdb, 0 0 80px #38fbdb, 0 0 90px #38fbdb, 0 0 100px #38fbdb, 0 0 150px #38fbdb;
  margin-bottom: 2rem;
`;

const Hero = () => {
  return (
    <Main>
      <GlitchedTitle data-text="DEV: The Gathering">DEV: The Gathering</GlitchedTitle>
      <ApplicationDescription>A decentralized/centralized collectible card game developed for learning purposes.</ApplicationDescription>
      <NeonSubtitle>Which version do you wanna play?</NeonSubtitle>
      <div>
        <Button href="/src/centralized">CENTRALIZED</Button>
        <Button href="/src/decentralized">DECENTRALIZED (CRYPTO)</Button>
      </div>
    </Main>
  );
};

export default Hero;
