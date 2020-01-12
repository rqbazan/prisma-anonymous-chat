import React from 'react'
import { Box } from '@xstyled/styled-components'
import FieldError from '../field-error'
import { Input } from './elements'

export default function FieldInput({
  label,
  name,
  error,
  className,
  style,
  inputRef,
  ...props
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      style={style}
      className={className}
    >
      <label htmlFor={name}>
        {label}
        <Input ref={inputRef} name={name} {...props} />
      </label>
      {error && (
        <Box mt="1">
          <FieldError>{error}</FieldError>
        </Box>
      )}
    </Box>
  )
}
