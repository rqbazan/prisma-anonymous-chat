import styled from '@xstyled/styled-components'

export const Container = styled.box.attrs({ role: 'button' })`
  display: flex;
  padding: 2;

  &:not(:last-child) {
    border-bottom: 1px solid;
    border-color: gray.3;
  }

  &:hover {
    background-color: gray.2;
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
