import React from 'react'
import { Box } from '@xstyled/styled-components'
import debounce from 'lodash.debounce'
import Icon from '../icon'
import { Input } from './elements'

export default function SearchBar({
  style,
  className,
  onLoading,
  onChange,
  ...props
}) {
  const debouncedOnChange = React.useCallback(debounce(onChange, 1000), [
    onChange
  ])

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
      <Input
        {...props}
        onChange={e => {
          onLoading(true)
          debouncedOnChange(e.target.value)
        }}
      />
    </Box>
  )
}
