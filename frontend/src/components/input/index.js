import styled from '@xstyled/styled-components'

export default styled.input`
  border: 1px solid;
  height: 10;
  width: full;
  border-radius: sm;
  border-color: gray.3;

  &:focus {
    outline: none;
    border-color: gray.5;
  }
`
