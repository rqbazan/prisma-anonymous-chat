import React from 'react'
import { Box } from '@xstyled/styled-components'
import { useModal } from '~/lib/modal'
import Avatar from '~/components/avatar'
import Icon from '~/components/icon'
import Ellipsis from '~/components/ellipsis'
import UpdateUserInfoModal from '../update-user-info-modal'

export default function UserSection({ user }) {
  const { controller } = useModal()

  return (
    <Box display="flex" width="full" height="auto" p="3">
      <Avatar nickname={user.nickname} />
      <Ellipsis mx="2" flex="1" fontSize="2">
        {user.nickname}
      </Ellipsis>
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
