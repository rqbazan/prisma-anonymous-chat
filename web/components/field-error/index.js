import React from 'react'
import { Box } from '@xstyled/styled-components'

export default function FieldError({ children }) {
  return (
    <Box
      display="flex"
      borderRadius="default"
      backgroundColor="red.4"
      px="3"
      py="3"
      alignItem="center"
      fontSize=""
    >
      {children}
    </Box>
  )
}
