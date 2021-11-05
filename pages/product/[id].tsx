import { GetStaticProps, InferGetStaticPropsType } from "next";

import {
  useProductByIdQuery,
  ProductCollectionDocument,
  ProductCollectionQuery,
} from "@/saleor/api";
import { apolloClient } from "@/lib";
import {
  Layout,
  ProductDetails,
} from '@/components';

const ProductPage = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { loading, error, data } = useProductByIdQuery({ variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (data && data.product) { // @patrys
    const { product } = data;

    return (
      <Layout>
        <ProductDetails product={product} />
      </Layout>
    );
  }

  return null;
}

export default ProductPage;

export async function getStaticPaths() {
  const { data } = await apolloClient.query<ProductCollectionQuery>({
    query: ProductCollectionDocument,
    variables: {
      first: 100,
    }
  });
  const paths = data.products?.edges.map(({ node: { id } }) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      id: params?.id,
    },
    revalidate: 15,
  };
};
