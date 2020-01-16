import React from 'react'
import Router from 'next/router'
import { Box } from '@xstyled/styled-components'
import Ellipsis from '../ellipsis'
import Avatar from '../avatar'
import Icon from '../icon'

export default function ChatHeader({ displayName }) {
  return (
    <Box
      display="flex"
      backgroundColor="gray.1"
      p="3"
      borderBottom="1px solid"
      borderColor="gray.3"
      width="full"
    >
      <Box
        role="button"
        display={{ xs: 'flex', md: 'none' }}
        alignItems="center"
        mr="1"
        mf={-4}
        onClick={() => Router.back()}
      >
        <Icon name="back" />
      </Box>
      <div style={{ flexShrink: 0 }}>
        <Avatar nickname={displayName} variant="small" />
      </div>
      <Ellipsis ml="2" fontSize="3" alignSelf="center" fontWeight="medium">
        {displayName}
      </Ellipsis>
    </Box>
  )
}
