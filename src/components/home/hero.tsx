import LinkButton from 'src/components/shared/buttons';
import { Glitch } from 'src/styles/animations';
import { Flex } from 'src/styles/mixins/flex';
import styled from 'styled-components';

const HeroContainer = styled.main`
  ${Flex({ flexGrow: 1, direction: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' })};
  min-height: 100vh;
  padding: 4rem 1rem;
  color: white;
  background: rgb(11, 30, 62);
  background: linear-gradient(167deg, rgba(11, 30, 62, 1) 0%, rgba(18, 45, 90, 1) 33%, rgba(143, 82, 245, 1) 66%, rgba(56, 251, 219, 1) 100%);

  div {
    ${Flex({ direction: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' })};
    max-width: 800px;

    @media (max-width: 600px) {
      width: 100%;
      flex-direction: column;
      a:first-child{
        margin-bottom: 1rem;
      }
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

const HomeHero = () => {
  return (
    <HeroContainer>
      <GlitchedTitle data-text="DEV: The Gathering">DEV: The Gathering</GlitchedTitle>
      <ApplicationDescription>A decentralized/centralized collectible card game developed for learning purposes.</ApplicationDescription>
      <NeonSubtitle>Which version do you wanna play?</NeonSubtitle>
      <div>
        <LinkButton href="/app/centralized">CENTRALIZED</LinkButton>
        <LinkButton href="/app/decentralized">DECENTRALIZED (CRYPTO)</LinkButton>
      </div>
    </HeroContainer>
  );
};

export default HomeHero;
