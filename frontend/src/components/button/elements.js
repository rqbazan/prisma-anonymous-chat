import styled from '@xstyled/styled-components'

export const ButtonAtom = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: gray.7;
  color: light;
  font-size: 1;
  font-weight: medium;
  padding: 2 3;
  border-radius: default;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: gray.6;
  }
`
