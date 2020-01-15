import styled, { css } from '@xstyled/styled-components'

const hoveredStyle = css`
  background-color: gray.2;
`

export const Container = styled.div.attrs({ role: 'button' })`
  display: flex;
  padding: 2 3;

  ${props => props.selected && hoveredStyle}

  &:not(:last-child) {
    border-bottom: 1px solid;
    border-color: gray.3;
  }

  &:hover {
    ${hoveredStyle}
  }

  &:focus {
    outline: none;
  }
`

export const MessengerNickName = styled.span`
  font-size: 1;
  font-weight: medium;
`

export const InfoContainer = styled.box`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 2;
  overflow: hidden;
  justify-content: center;
`
