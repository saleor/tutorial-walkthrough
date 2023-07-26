export { formatAsMoney } from './util';

import {
  type TypedDocumentString
} from '../gql/graphql';

type GraphQLError = {
  message: string;
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type GraphQLRespone<T> = { data: T } | { errors: readonly GraphQLError[] }

export const ProductsPerPage = 8;

const endpoint = "https://learn.saleor.cloud/graphql/";

export async function execute<Result, Variables>({
  query,
  variables,
  headers,
  cache,
  revalidate
}: {
  query: TypedDocumentString<Result, Variables>;
  variables?: Variables;
  headers?: HeadersInit;
  cache?: RequestCache;
  revalidate?: number;
}): Promise<Result> {

  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify({
      query: query.toString(),
      ...(variables && { variables })
    }),
    cache: 'default',
    next: { revalidate }
  });

  const body = (await result.json()) as GraphQLRespone<Result>;

  if ('errors' in body) {
    throw body.errors[0];
  }

  return body.data;
}

export const USDollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});