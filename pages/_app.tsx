import type { AppProps } from 'next/app'

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import '../styles/globals.css'

const client = new ApolloClient({
  uri: "https://tutorial.saleor.cloud/graphql/",
  cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}