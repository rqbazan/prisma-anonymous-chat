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
      <Avatar nickname={displayName} size="small" />
      <Box ml="2" fontSize="3" alignSelf="center" fontWeight="500">
        {displayName}
      </Box>
    </Box>
  )
}
