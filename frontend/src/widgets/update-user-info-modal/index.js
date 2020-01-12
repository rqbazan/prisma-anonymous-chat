import React from 'react'
import { Box } from '@xstyled/styled-components'
import FieldInput from '~/components/field-input'
import Button from '~/components/button'

export default function UpdateUserInfoModal({ user }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minWidth={{ xs: 'full', md: 'md', lg: 'lg' }}
    >
      <Box fontSize="3">
        <h2>Update Information</h2>
      </Box>
      <Box mt="3">
        <FieldInput label="Nickname" defaultValue={user.nickname} autoFocus />
      </Box>
      <Box mt="3" display="flex" justifyContent="flex-end">
        <Button>Update</Button>
      </Box>
    </Box>
  )
}
