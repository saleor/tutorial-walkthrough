import { ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from "@apollo/client/utilities";

export const apolloClient = new ApolloClient({
  uri: "https://vercel.saleor.cloud/graphql/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: relayStylePagination(),
        },
      },
    }
  }),
});