import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  [role="button"] {
    :focus {
      outline: none;
    }
  }

  html,
  body {
    height: 100%;
  }

  #__next {
    height: inherit;
  }
`
