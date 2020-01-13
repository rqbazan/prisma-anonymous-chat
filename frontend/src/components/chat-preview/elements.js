import styled, { css } from '@xstyled/styled-components'

const hoveredStyle = css`
  background-color: gray.2;
`

export const Container = styled.box.attrs({ role: 'button' })`
  display: flex;
  padding: 2;

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

export const MessageContent = styled.span`
  color: gray.7;
  font-size: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
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
`
