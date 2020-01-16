import React from 'react'
import { Box } from '@xstyled/styled-components'
import { Container } from './elements'

export default function CenterBox({ height, children }) {
  return (
    <Container>
      <Box height={height} display="inline-flex">
        {children}
      </Box>
    </Container>
  )
}
