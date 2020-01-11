import React from 'react'
import { Box } from '@xstyled/styled-components'
import Avatar from '../avatar'

export default function ChatHeader({ chat }) {
  const displayName = chat.isPrivate
    ? chat.messenger.nickname
    : chat.category.name

  return (
    <Box
      display="flex"
      backgroundColor="gray.1"
      p="3"
      borderBottom="1px solid"
      borderColor="gray.3"
    >
      <Avatar nickname={displayName} />
      <Box
        ml="2"
        css={`
          text-transform: uppercase;
          font-size: 2;
          align-self: center;
        `}
      >
        {displayName}
      </Box>
    </Box>
  )
}
