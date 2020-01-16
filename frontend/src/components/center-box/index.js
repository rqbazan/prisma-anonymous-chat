import React from 'react'
import { Box } from '@xstyled/styled-components'
import { Container } from './elements'

export default function CenterBox({ innerHeight, children }) {
  return (
    <Container>
      <Box height={innerHeight} display="inline-flex">
        {children}
      </Box>
    </Container>
  )
}
