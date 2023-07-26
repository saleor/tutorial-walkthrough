import {
  ProductByIdDocument ,
} from "@/gql/graphql";
import {
  ProductDetails,
} from '@/components';
import { execute } from "@/lib/index";

export default async function ProductPage(props: { params: { id: string }}) {
  const { params: { id } } = props;

  const { product } = await execute({
    query: ProductByIdDocument,
    variables: {
      id: decodeURIComponent(id)
    },
    revalidate: 1,
  })

  if (product) { 
    return (
      <ProductDetails product={product} />
    );
  }

  return null;
}

// export async function generateStaticParams() {
//   const { products } = await execute({
//     query: ProductCollectionDocument,
//   })

//   return products?.edges.map(({ node: { id } }) => ({ id }));
// }