import { Flex } from 'src/styles/mixins/flex';
import styled from 'styled-components';

const Section = styled.section`
  ${Flex({ flexGrow: 1, direction: 'column', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center' })};
  //min-height: 100vh;
  padding: 2rem 2rem;

  .container {
    //background: #e1e1e1;
    min-height: 400px;
    width: 100%;
    //border: 5px solid #38fbdb;
    //border-radius: 10px 0 10px 0;

    h2,
    ul li {
      text-align: left;
    }
    ul,
    li {
      list-style: none;
    }
  }
`;

const KnowMore = () => {
  return (
    <Section>
      <div className="container">
        <h1>What is DEV: The Gathering?</h1>
        <div className="row">
          <div className="col-12">
            <p>DEV: The Gathering its a game, collectible card game developed for development learning purposes, using the following languages/frameworks/libs:</p>
          </div>
          <div className="col-12 col-md-4">
            <h2>Web Application</h2>
            <ul>
              <li>Next.js</li>
              <li>React.js</li>
              <li>Styled Components</li>
              <li>Typescript</li>
            </ul>
          </div>
          <div className="col-12 col-md-4">
            <h2>Centralized APIs</h2>
            <ul>
              <li>Apollo Server</li>
              <li>Firebase Functions</li>
              <li>Cloud Firestore</li>
              <li>Typescript</li>
            </ul>
          </div>
          <div className="col-12 col-md-4">
            <h2>Decentralized APIs</h2>
            <ul>
              <li>The Graph</li>
              <li>Chainlink</li>
              <li>Polygon</li>
              <li>Solidity</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default KnowMore;
