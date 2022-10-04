import Link from 'next/link';
import { Flex } from 'src/styles/mixins/flex';
import { Glass } from 'src/styles/mixins/glass';
import styled from 'styled-components';

const Section = styled.section`
  ${Flex({ flexGrow: 1, direction: 'column', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center' })};
  //min-height: 100vh;
  padding: 2rem 2rem;
  text-align: left;

  .container {
    min-height: 400px;
    width: 100%;
    ${Glass};
    padding: 1.5rem;
    font-size: 18px;
    ul,
    li {
      list-style: none;
    }

    h2 {
      margin-top: 2rem;
      &:first-child {
        margin-top: 0;
      }
    }

    .common-label,
    .uncommon-label,
    .rare-label,
    .epic-label,
    .legendary-label {
      padding: 2px 4px;
      border-radius:3px;
    }

    .common-label {
      background-color: #c9c9c9;
    }
    .uncommon-label {
      background-color: #24ce6b;
    }
    .rare-label {
      background-color: #2473ce;
    }
    .epic-label {
      background-color: #a624ce;
    }
    .legendary-label {
      background-color: #ceb524;
    }
  }
`;

const KnowMore = () => {
  return (
    <Section>
      <div className="container">
        <h2>How does it work?</h2>
        <p>
          There are 21 (9 commons, six uncommon, four rare, two epic, and one legendary) cards based on programming languages, frameworks, and libs. Each card has attributes like
          name, rarity, number, and art. The goal is to collect them all. For each booster pack a user opens, he gets three random cards.
        </p>
        <h4>The probability of obtaining a card by its rarity is:</h4>
        <ul>
          <li>
            40% chance for <span className="common-label">common</span> cards;
          </li>
          <li>
            30% chance for <span className="uncommon-label">uncommon</span> cards;
          </li>
          <li>
            17% chance for <span className="rare-label">rare</span> cards;
          </li>
          <li>
            08% chance for <span className="epic-label">epic</span> cards;
          </li>
          <li>
            05% chance for a <span className="legendary-label">legendary</span> card.
          </li>
        </ul>
        <p>Every card has a 5% chance of being a foil.</p>
        <h2>How do the users get a booster pack?</h2>
        <p>
          In the centralized version, the user can open one booster pack daily.
          <br />
          In the decentralized version, the user can open as many as he likes.
        </p>
        <h2>Is there a cost?</h2>
        <p>In the centralized version, no, but in the decentralized its costs 0.05 MATIC and the gas fee.</p>
        <h2>Why is there a cost for the decentralized version?</h2>
        <p>
          Smart contracts running on the blockchain have a problem generating real random numbers. To surpass that problem, we have to use an oracle service, which charges for
          every random data provided beside the transaction&apos;s gas fee.
        </p>
        <h2>In the decentralized version, is the card an NFT?</h2>
        <p>
          Not really. It&apos;s similar in the sense that the card has an owner, the contract can&apos;t change the ownership or any property of a card, and the data is stored on a
          blockchain, but the smart contract doesn&apos;t implement the ERC-721 standard.
        </p>
        <h2>What is the tech stack used to build DEV: The Gathering?</h2>
        <p>
          The web application uses React with Next.js, Typescript, styled-components, Bootstrap, Apollo Client, Firebase, and Ethers.js.
          <br />
          The centralized API uses an Apollo Server running on Firebase functions, Firebase Authentication to handle authentication, and Firebase Firestore as a document database.
          <br />
          The decentralized version uses a Subgraph in The Graph for blockchain data indexation, Polygon as layer 2 Ethereum network, chainlink as oracle provider, and Solidity to
          develop the smart contract.
        </p>
        <h2>Who is behind this project, and what did you want to learn?</h2>
        <p>
          My name is Paulo Tarso, I&apos;m a sênior full-stack developer from Brazil, for that project I chose only technologies that I didn&apos;t know or I did want to improve.
          <br />I had prior experience with Boostrap, Typescript, and React with javascript, but I wanted to try React with Typescript and Next.js. Besides that, everything was new
          to me.
          <br />
          It took me almost two weeks to learn and develop everything. It&apos;s not a finished project. There&apos;s a lot of polishing, tests, and refactoring, but looking as an
          MVP for learning, I think it&apos;s okay.
        </p>
        <h2>There&apos;s a public source code?</h2>
        <p>Yeah, you can check it out on GitHub:</p>
        <ul>
          <li>
            <Link href={'https://github.com/oluaptarso/dev-the-gathering-smart-contract'} target="_blank">
              Smart Contract
            </Link>
            ;
          </li>
          <li>
            <Link href={'https://github.com/oluaptarso/dev-the-gathering-subgraph'} target="_blank">
              Subgraph
            </Link>
            ;
          </li>
          <li>
            <Link href={'https://github.com/oluaptarso/dev-the-gathering-server'} target="_blank">
              Centralized APIs
            </Link>
            ;
          </li>
          <li>
            <Link href={'https://github.com/oluaptarso/dev-the-gathering-webapp'} target="_blank">
              Web Application
            </Link>
            .
          </li>
        </ul>
      </div>
    </Section>
  );
};

export default KnowMore;
