import styled from '@xstyled/styled-components'

export const Input = styled.input`
  border: 1px solid;
  height: 10;
  padding-left: 36px;
  padding-right: 2;
  width: full;
  border-radius: sm;
  border-color: gray.3;

  &:focus {
    outline: none;
    border-color: gray.5;
  }
`
