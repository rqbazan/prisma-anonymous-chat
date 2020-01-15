import React from 'react'
import { Box } from '@xstyled/styled-components'
import { InnerContainer } from './elements'

export default function Ellipsis({ children, ...props }) {
  return (
    <Box display="flex" alignItems="center" overflow="hidden" {...props}>
      <InnerContainer>{children}</InnerContainer>
    </Box>
  )
}
