import React from 'react'
import { Box } from '@xstyled/styled-components'
import debounce from 'lodash.debounce'
import Icon from '../icon'
import { Input } from './elements'

export default function SearchBar({
  style,
  className,
  onSearching,
  onSearch,
  onChange,
  ...props
}) {
  const debouncedOnSearch = React.useCallback(debounce(onSearch, 1000), [
    onSearch
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
          onSearching(true)
          onChange(e)
          debouncedOnSearch(e.target.value)
        }}
      />
    </Box>
  )
}
