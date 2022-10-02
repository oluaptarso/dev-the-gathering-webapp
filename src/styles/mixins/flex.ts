import { css } from 'styled-components';

type FlexProps = {
  direction?: 'row' | 'row-reverse' | 'column' | 'inherit' | 'initial' | 'unset';
  justifyContent?:
    | 'center'
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'left'
    | 'right'
    | 'normal'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | 'safe center'
    | 'unsafe center'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revert-layer'
    | 'unset';
  alignItems?:
    | 'normal'
    | 'stretch'
    | 'center'
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'first baseline'
    | 'last baseline'
    | 'safe center'
    | 'unsafe center'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revert-layer'
    | 'unset';
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'justify-all' | 'match-parent' | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexGrow?: number;
  alignContent?:
    | 'center'
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'normal'
    | 'baseline'
    | 'first baseline'
    | 'last baseline'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | 'safe center'
    | 'unsafe center'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset';
};

export const Flex = (props: FlexProps) => css`
  display: flex;
  ${props.flexGrow ? `flex: ${props.flexGrow}` : ''};
  ${props.direction ? `flex-direction: ${props.direction}` : ''};
  ${props.justifyContent ? `justify-content: ${props.justifyContent}` : ''};
  ${props.alignItems ? `align-items: ${props.alignItems}` : ''};
  ${props.textAlign ? `text-align: ${props.textAlign}` : ''};
  ${props.flexWrap ? `flex-wrap: ${props.flexWrap}` : ''};
  ${props.alignContent ? `flex-wrap: ${props.alignContent}` : ''};
`;
