import React from 'react'
import NextApp from 'next/app'
import { ThemeProvider } from '@xstyled/styled-components'
import { ModalProvider, ModalCanvas } from '~/lib/modal'
import theme from '~/theme'
import Preflight from '~/preflight'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Preflight />
        <ModalProvider>
          <Component {...pageProps} />
          <ModalCanvas />
        </ModalProvider>
      </ThemeProvider>
    )
  }
}
