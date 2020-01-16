import React from 'react'
import CenterBox from '../center-box'

export default function UnselectedChat() {
  return (
    <CenterBox height={{ xs: '30%', lg: '50%' }}>
      <img
        src="https://res.cloudinary.com/dpwoyjb1f/image/upload/v1578743281/id-challenge/undraw_ideas_s70l_cqs02q.svg"
        alt="no selected chat"
        css={`
          height: 100%;
          max-width: 100%;
        `}
      />
    </CenterBox>
  )
}
