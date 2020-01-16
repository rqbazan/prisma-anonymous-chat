import React from 'react'
import { Box } from '@xstyled/styled-components'
import Input from '~/components/input'
import Icon from '~/components/icon'

export default function ChatInput({ onSend }) {
  const inputRef = React.useRef()

  function dispatchMessage() {
    if (!inputRef.current.value) {
      return
    }

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
      display="flex"
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
      <Box
        role="button"
        tabIndex="0"
        style={{ transform: 'rotate(90deg)' }}
        ml="3"
        onClick={dispatchMessage}
        onKeyPress={dispatchMessage}
      >
        <Icon name="send" size={40} />
      </Box>
    </Box>
  )
}
