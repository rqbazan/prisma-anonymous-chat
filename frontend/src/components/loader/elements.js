import styled, { keyframes } from '@xstyled/styled-components'

const dashoffset = keyframes`
  0% {
    stroke-dashoffset: var(--offset);
  }
  50% {
    stroke-dashoffset: 0;
  }
  50.1% {
    stroke-dashoffset: calc(var(--offset) * 2);
  }
`

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Svg = styled.svg`
  animation: ${rotate} 1s linear infinite;
  circle {
    height: full;
    width: full;
    animation: ${dashoffset} 4s linear infinite;
  }
`
