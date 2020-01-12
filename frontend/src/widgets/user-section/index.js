import React from 'react'
import { Box } from '@xstyled/styled-components'
import { useModal } from '~/lib/modal'
import Avatar from '~/components/avatar'
import Icon from '~/components/icon'
import UpdateUserInfoModal from '../update-user-info-modal'

export default function UserSection({ user }) {
  const { controller } = useModal()

  return (
    <Box display="flex" width="100%" height="auto" p="3">
      <Avatar nickname={user.nickname} />
      <Box
        mx="2"
        flex="1"
        display="flex"
        alignItems="center"
        fontSize="2"
        overflow="hidden"
      >
        <span
          css={`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            min-width: 0;
          `}
        >
          {user.nickname}
        </span>
      </Box>
      <Box display="flex" alignItems="center">
        <Box
          role="button"
          mr="2"
          onClick={() => controller.open(UpdateUserInfoModal, { user })}
        >
          <Icon name="config" />
        </Box>
        <div role="button">
          <Icon name="add" />
        </div>
      </Box>
    </Box>
  )
}
