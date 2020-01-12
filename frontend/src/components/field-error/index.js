import React from 'react'
import { Box } from '@xstyled/styled-components'

export default function FieldError({ children }) {
  return (
    <Box
      display="flex"
      borderRadius="default"
      backgroundColor="red.4"
      px="2"
      py="2"
      alignItems="center"
      fontSize="0"
    >
      {children}
    </Box>
  )
}
