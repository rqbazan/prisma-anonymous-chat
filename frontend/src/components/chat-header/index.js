import React from 'react'
import Router from 'next/router'
import { Box } from '@xstyled/styled-components'
import Avatar from '../avatar'
import Icon from '../icon'

export default function ChatHeader({ chat }) {
  return (
    <Box
      display="flex"
      backgroundColor="gray.1"
      p="3"
      borderBottom="1px solid"
      borderColor="gray.3"
    >
      <Box
        role="button"
        display={{ xs: 'flex', md: 'none' }}
        alignItems="center"
        mr="1"
        onClick={() => Router.back()}
      >
        <Icon name="back" />
      </Box>
      <Avatar nickname={chat.displayName} size="small" />
      <Box ml="2" fontSize="3" alignSelf="center" fontWeight="500">
        {chat.displayName}
      </Box>
    </Box>
  )
}
