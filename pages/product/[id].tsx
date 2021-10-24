import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useLocalStorage } from "react-use";

import {
  useProductByIdQuery,
  useAddProductVariantToCartMutation,
  ProductCollectionDocument,
  ProductCollectionQuery
} from "@/saleor/api";
import { apolloClient } from "@/lib";
import {
  Layout
} from '@/components';

const styles = {
  columns: 'grid grid-cols-2 gap-x-10 items-start',
  image: {
    aspect: 'aspect-w-1 aspect-h-1 bg-white rounded',
    content: 'object-center object-cover'
  },
  details: {
    title: 'text-4xl font-bold tracking-tight text-gray-800',
    category: 'text-lg mt-2 font-medium text-gray-500',
    description: 'prose lg:prose-s'
  }
}

const ProductPage = ({ id }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [token] = useLocalStorage('token');
  const { loading, error, data } = useProductByIdQuery({ variables: { id } });
  const [addProductToCart] = useAddProductVariantToCartMutation();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (data) {
    const { product } = data;

    const onAddToCart = async () => {
      await addProductToCart({
        variables: { checkoutToken: token, variantId: product?.variants![0]?.id! },
      });
      router.push("/cart");
    };

    return (
      <Layout>
        <div className={styles.columns}>
          <div className={styles.image.aspect}>
            <img
              src={product?.media![0]?.url}
              className={styles.image.content}
            />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className={styles.details.title}>
                {product?.name}
              </h1>
              <p className={styles.details.category}>
                {product?.category?.name}
              </p>
            </div>

            <article className={styles.details.description}>
              {product?.description}
            </article>
            <button
              onClick={onAddToCart}
              type="submit"
              className="primary-button"
            >
              Add to cart
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
}

export default ProductPage;

export async function getStaticPaths() {
  const { data } = await apolloClient.query<ProductCollectionQuery>({
    query: ProductCollectionDocument
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
  };
};
