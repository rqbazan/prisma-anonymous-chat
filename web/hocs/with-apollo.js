import React from 'react'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'
import fetch from 'isomorphic-unfetch'

let cachedApolloClient = null

function createApolloClient(initialState = {}) {
  const httpLink = createHttpLink({
    fetch,
    uri: `${process.env.API}/graphql`,
    credentials: 'same-origin'
  })

  const authLink = setContext((_, prevContext) => {
    return {
      ...prevContext,
      headers: {
        'non-secret-id':
          typeof window === 'undefined'
            ? undefined
            : sessionStorage.getItem('non-secret-id')
      }
    }
  })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache().restore(initialState)
  })
}

function initApolloClient(initialState) {
  if (typeof window === 'undefined') {
    return createApolloClient(initialState)
  }

  if (!cachedApolloClient) {
    cachedApolloClient = createApolloClient(initialState)
  }

  return cachedApolloClient
}

export default function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState)
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    WithApollo.displayName = `withApollo(${displayName})`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx

      const apolloClient = initApolloClient()
      ctx.apolloClient = apolloClient

      // Run wrapped getInitialProps methods
      let pageProps = {}

      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx)
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr')
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
              />
            )
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error)
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind()
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract()

      return {
        ...pageProps,
        apolloState
      }
    }
  }

  return WithApollo
}
