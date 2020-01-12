import styled from '@xstyled/styled-components'

export const MessageRow = styled.box`
  display: flex;
  padding: 0 2;

  &:not(:last-child) {
    margin-bottom: 3;
  }

  &:first-of-type {
    margin-top: 3;
  }

  &:last-of-type {
    margin-bottom: 3;
  }
`
