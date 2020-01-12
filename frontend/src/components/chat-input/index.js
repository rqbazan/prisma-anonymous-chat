import React from 'react'
import { Box } from '@xstyled/styled-components'
import Input from '~/components/input'

export default function ChatInput() {
  return (
    <Box
      borderTop="1px solid"
      p="3"
      backgroundColor="gray.1"
      borderColor="gray.3"
    >
      <Input placeholder="Type a message..." />
    </Box>
  )
}
