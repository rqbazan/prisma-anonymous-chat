import React from 'react'
import { Box } from '@xstyled/styled-components'
import { Container } from './elements'

export default function CenterBox({ innerHeight, children, ...props }) {
  return (
    <Container {...props}>
      <Box height={innerHeight} display="inline-flex">
        {children}
      </Box>
    </Container>
  )
}
