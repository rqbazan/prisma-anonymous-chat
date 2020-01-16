import React from 'react'
import { Box } from '@xstyled/styled-components'

export default function FieldError({ children }) {
  return (
    <Box
      display="flex"
      borderRadius="default"
      backgroundColor="red.3"
      p="2"
      alignItems="center"
      fontSize="0"
      color="red.8"
    >
      {children}
    </Box>
  )
}
