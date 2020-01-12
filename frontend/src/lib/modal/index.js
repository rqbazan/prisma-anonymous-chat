import React from 'react'
import ReactDOM from 'react-dom'
import { Box } from '@xstyled/styled-components'
import {
  GlobalStyle,
  CanvasContainer,
  ModalContainer,
  CloseIcon
} from './elements'

export const ModalContext = React.createContext()

export function ModalProvider({ children }) {
  const [modal, setModal] = React.useState({ component: null })

  const controller = {
    open: (component, props) => setModal({ component, props }),
    close: () => setModal({ component: null })
  }

  return (
    <ModalContext.Provider value={{ controller, modal }}>
      {children}
    </ModalContext.Provider>
  )
}

function Escapable({ children, onEscape }) {
  React.useEffect(() => {
    const closeModalByEsc = e => {
      if (e.key === 'Escape') {
        onEscape()
      }
    }

    document.addEventListener('keydown', closeModalByEsc)

    return () => document.removeEventListener('keydown', closeModalByEsc)
  }, [])

  return children
}

let canvasEl = null

export function ModalCanvas() {
  const { modal, controller } = React.useContext(ModalContext)

  if (!modal.component || typeof window === 'undefined') {
    return null
  }

  if (!canvasEl) {
    canvasEl = document.createElement('div')
    document.body.appendChild(canvasEl)
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Escapable onEscape={controller.close}>
          <CanvasContainer onClick={controller.close}>
            <ModalContainer onClick={e => e.stopPropagation()}>
              <Box position="relative">
                <Box
                  role="button"
                  position="absolute"
                  right="0"
                  onClick={controller.close}
                >
                  <CloseIcon />
                </Box>
                {React.createElement(modal.component, {
                  controller,
                  ...modal.props
                })}
              </Box>
            </ModalContainer>
          </CanvasContainer>
        </Escapable>,
        canvasEl
      )}
      <GlobalStyle />
    </>
  )
}

export function useModal() {
  return React.useContext(ModalContext)
}
