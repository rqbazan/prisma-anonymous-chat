import React from 'react'
import Loader from '~/components/loader'
import { ButtonAtom } from './elements'

export default function Button({ loading, children, ...props }) {
  return (
    <ButtonAtom {...props}>
      {!loading ? (
        children
      ) : (
        <>
          <span style={{ opacity: 0 }}>{children}</span>
          <span
            style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Loader />
          </span>
        </>
      )}
    </ButtonAtom>
  )
}
