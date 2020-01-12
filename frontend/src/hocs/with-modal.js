import React from 'react'
import { ModalProvider, ModalCanvas } from '~/lib/modal'

export default function withModal(PageComponent) {
  const WithModal = props => {
    return (
      <ModalProvider>
        <PageComponent {...props} />
        <ModalCanvas />
      </ModalProvider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'
    WithModal.displayName = `withModal(${displayName})`
  }

  if (PageComponent.getInitialProps) {
    WithModal.getInitialProps = PageComponent.getInitialProps
  }

  return WithModal
}
