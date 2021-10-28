import type { AppProps } from 'next/app'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from "@apollo/client/utilities";

import '../styles/main.css';

const client = new ApolloClient({
  uri: "https://vercel.saleor.cloud/graphql/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: relayStylePagination([]),
        },
      },
    }
  }),
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}