import React from 'react'

import { client, urlFor } from '../../lib/client'

/* 
  ProductDetails page will be rendered when the user
  chooses an item as the our products contain a unique 
  "slug" that includes "/product/{slug}" in the Link
  component for Next.js, and this page component is being 
  contained in the /product/ directory.

  This is the functionality of page-based routing.

  Also, pass in the props we will get from our getStaticProps
  function
*/
const ProductDetails = ({ itemData, productsData }) => {

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
              <img src="" />
          </div>
        </div>
      </div>
    </div>
  )
}

// This getStaticProps method will allow Next.js to pre-render the page at 
// build time using the props returned from this function.
export const getStaticProps = async ({ params: { slug } }) => {
  // For the product query, only return the first element that matches the query.
  const itemQuery = `*[_type == "product" && slug.current == '${slug}'][0]`
  const itemData = await client.fetch(itemQuery)
  const productsQuery = '*[_type == "product"]'
  const productsData = await client.fetch(productsQuery)

  return {
    props: { itemData, productsData }
  }
}
export default ProductDetails