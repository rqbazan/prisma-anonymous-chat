import React from 'react'
import styled, { css, up, createGlobalStyle } from '@xstyled/styled-components'

export const GlobalStyle = createGlobalStyle`
  #__next {
    filter: blur(3px);
  }
`

export const CanvasContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 9999999;
  height: screenHeight;
  width: full;
  top: 0;
`

export const ModalContainer = styled.div`
  height: full;
  width: full;
  background-color: gray.1;
  padding: 4;

  ${up(
    'md',
    css`
      height: auto;
      width: auto;
      box-shadow: md;
    `
  )}
`

export const CloseIcon = () => (
  <svg
    height={32}
    width={32}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      fillRule="evenodd"
      d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
    />
  </svg>
)
