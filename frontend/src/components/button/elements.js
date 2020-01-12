import styled from '@xstyled/styled-components'

export const ButtonAtom = styled.button`
  align-items: center;
  background-color: gray.7;
  border-color: transparent;
  border-radius: default;
  border-style: solid;
  border-width: 2;
  color: light;
  display: flex;
  font-size: 1;
  font-weight: medium;
  justify-content: center;
  padding: 2 3;
  position: relative;

  &:focus {
    border-color: indigo.6;
    border-style: solid;
    border-width: 2;
    outline: none;
  }

  &:hover {
    background-color: gray.6;
  }
`
