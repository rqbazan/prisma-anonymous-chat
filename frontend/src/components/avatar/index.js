/* eslint no-bitwise: 0 */
import React from 'react'
import { Container } from './elements'

// reference: https://stackoverflow.com/q/3426404
function getHashCode(string) {
  let hash = 0

  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 2) - hash)
    hash &= hash
  }

  return hash
}

export default function Avatar({ nickname, variant }) {
  const shortened = getHashCode(nickname) % 360

  const bgColor = `hsl(${shortened},50%,90%)`
  const textColor = `hsl(${shortened},100%,20%)`

  return (
    <Container
      variant={variant}
      style={{
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      {nickname.slice(0, 2)}
    </Container>
  )
}
