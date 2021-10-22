import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';

import '../styles/main.css';

import { apolloClient } from '@/lib';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}