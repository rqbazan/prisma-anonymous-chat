import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  [role="button"] {
    :focus {
      outline: none;
    }
  }
`
