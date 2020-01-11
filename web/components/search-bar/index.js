import React from 'react'
import { Box } from '@xstyled/styled-components'
import Icon from '../icon'
import { Input } from './elements'

export default function SearchBar({ style, className, ...props }) {
  return (
    <Box
      display="flex"
      position="relative"
      alignItems="center"
      style={style}
      className={className}
    >
      <Icon
        name="search"
        size={24}
        css={`
          position: absolute;
          left: 8px;
        `}
      />
      <Input {...props} />
    </Box>
  )
}
