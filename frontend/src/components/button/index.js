import styled from '@xstyled/styled-components'

export default styled.button`
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
