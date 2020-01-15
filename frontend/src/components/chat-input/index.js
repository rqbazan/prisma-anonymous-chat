import React from 'react'
import { Box } from '@xstyled/styled-components'
import Input from '~/components/input'

export default function ChatInput({ onSend }) {
  const inputRef = React.useRef()

  function dispatchMessage() {
    onSend(inputRef.current.value)
    inputRef.current.value = ''
  }

  function onKeyPress(e) {
    if (e.key === 'Enter') {
      dispatchMessage()
    }
  }

  return (
    <Box
      borderTop="1px solid"
      p="3"
      backgroundColor="gray.1"
      borderColor="gray.3"
    >
      <Input
        ref={inputRef}
        placeholder="Type a message..."
        onKeyPress={onKeyPress}
      />
    </Box>
  )
}
