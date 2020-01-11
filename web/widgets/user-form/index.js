import React from 'react'
import { Box } from '@xstyled/styled-components'
import Input from '~/components/input'

export default function UpdateUserForm() {
  return (
    <Box display="flex">
      <Box>
        <h2>Update information</h2>
      </Box>
      <Box>
        <Input placeholder="" />
      </Box>
    </Box>
  )
}
