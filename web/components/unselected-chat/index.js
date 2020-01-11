import React from 'react'
import { Box } from '@xstyled/styled-components'

export default function UnselectedChat() {
  return (
    <Box m="auto" height="1/2">
      <img
        src="https://res.cloudinary.com/dpwoyjb1f/image/upload/v1578743281/id-challenge/undraw_ideas_s70l_cqs02q.svg"
        alt="no selected chat"
        css={`
          height: 100%;
          max-width: 100%;
        `}
      />
    </Box>
  )
}
