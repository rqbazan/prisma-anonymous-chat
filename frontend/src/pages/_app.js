import React from 'react'
import NextApp from 'next/app'
import dynamic from 'next/dynamic'
import { ThemeProvider } from '@xstyled/styled-components'
import theme from '~/theme'
import Preflight from '~/preflight'
import GlobalStyle from '~/global-style'
import 'zeit-toast-clone/styles.css'

const NotifierPortal = dynamic(
  () => import('zeit-toast-clone').then(mod => mod.NotifierPortal),
  {
    ssr: false
  }
)

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Preflight />
        <GlobalStyle />
        <NotifierPortal />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
