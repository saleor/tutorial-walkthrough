import type { NextPage } from 'next'
import React from 'react'

import { 
  ProductCollection,
  Layout 
} from '@/components';

const Home: NextPage = () => {
  return (
    <Layout>
      <ProductCollection />
    </Layout>
  )
}

export default Home
