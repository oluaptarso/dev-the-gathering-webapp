import { keyframes } from 'styled-components';

export const Pulse = keyframes`
  0% {
    box-shadow: 0 0 4px #fff, inset 0 0 20px 6px #38fbdb;
  }
  50% {
    box-shadow: 0 0 4px #fff, inset 0 0 20px 0px #38fbdb;
  }
  100% {
    box-shadow: 0 0 4px #fff, inset 0 0 20px 6px #38fbdb;
  }
`;

export const Glitch = keyframes`
  0% {
    -webkit-clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
    clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  2% {
    -webkit-clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
    clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
    -webkit-transform: translate(-5px);
    transform: translate(-5px);
  }
  6% {
    -webkit-clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
    clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
    -webkit-transform: translate(5px);
    transform: translate(5px);
  }
  8% {
    -webkit-clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
    clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
    -webkit-transform: translate(-5px);
    transform: translate(-5px);
  }
  9% {
    -webkit-clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
    clip-path: polygon(0 78%, 100% 78%, 100% 100%, 0 100%);
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  10% {
    -webkit-clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%);
    clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%);
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }
  13% {
    -webkit-clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%);
    clip-path: polygon(0 54%, 100% 54%, 100% 44%, 0 44%);
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  13.1% {
    -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }
  15% {
    -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 40%, 0 40%);
    clip-path: polygon(0 60%, 100% 60%, 100% 40%, 0 40%);
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }
  20% {
    -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 40%, 0 40%);
    clip-path: polygon(0 60%, 100% 60%, 100% 40%, 0 40%);
    -webkit-transform: translate3d(-5px, 0, 0);
    transform: translate3d(-5px, 0, 0);
  }
  20.1% {
    -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }
  25% {
    -webkit-clip-path: polygon(0 85%, 100% 85%, 100% 40%, 0 40%);
    clip-path: polygon(0 85%, 100% 85%, 100% 40%, 0 40%);
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }
  30% {
    -webkit-clip-path: polygon(0 85%, 100% 85%, 100% 40%, 0 40%);
    clip-path: polygon(0 85%, 100% 85%, 100% 40%, 0 40%);
    -webkit-transform: translate3d(-5px, 0, 0);
    transform: translate3d(-5px, 0, 0);
  }
  30.1% {
    -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
  35% {
    -webkit-clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
    clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
    -webkit-transform: translate(-5px);
    transform: translate(-5px);
  }
  40% {
    -webkit-clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
    clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
    -webkit-transform: translate(5px);
    transform: translate(5px);
  }
  45% {
    -webkit-clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
    clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
    -webkit-transform: translate(-5px);
    transform: translate(-5px);
  }
  50% {
    -webkit-clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
    clip-path: polygon(0 63%, 100% 63%, 100% 80%, 0 80%);
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  55% {
    -webkit-clip-path: polygon(0 10%, 100% 10%, 100% 0, 0 0);
    clip-path: polygon(0 10%, 100% 10%, 100% 0, 0 0);
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }
  60% {
    -webkit-clip-path: polygon(0 10%, 100% 10%, 100% 0, 0 0);
    clip-path: polygon(0 10%, 100% 10%, 100% 0, 0 0);
    opacity: 1;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  60.1% {
    -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    opacity: 1;
  }
  to {
    -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    opacity: 1;
  }
`;