import React from 'react'
import { Box } from '@xstyled/styled-components'
import Input from '../input'
import FieldError from '../field-error'

export default function FieldInput({
  label,
  name,
  error,
  className,
  style,
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
        <Input {...props} />
      </label>
      {error && (
        <Box mt="1">
          <FieldError>{error}</FieldError>
        </Box>
      )}
    </Box>
  )
}
