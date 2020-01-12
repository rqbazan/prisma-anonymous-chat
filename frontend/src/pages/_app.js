import React from 'react'
import NextApp from 'next/app'
import { ThemeProvider } from '@xstyled/styled-components'
import theme from '~/theme'
import Preflight from '~/preflight'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Preflight />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
