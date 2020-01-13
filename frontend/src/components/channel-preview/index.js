import React from 'react'
import { Box } from '@xstyled/styled-components'
import Avatar from '../avatar'
import ChatPreview from '../chat-preview'

export default function ChannelPreview({ channel, ...props }) {
  return (
    <ChatPreview.Container {...props}>
      <Avatar nickname={channel.displayName} size="tiny" />
      <Box display="flex" ml="2" alignItems="center" fontSize="0">
        {channel.displayName}
      </Box>
    </ChatPreview.Container>
  )
}
