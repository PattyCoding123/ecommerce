import React from 'react'

import { client } from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '../components'

// Pass in props we get from our getServerSideProps function.
const Home = ({ productsData, bannerData }) => {
  return (
    /* 
      The Home Page will have a few sections:
      1. The hero banner which will be styled
      2. A div containing the best-selling products
      3. A div that contains all of the best-selling produts
      4. A Sale banner
    */
    <>
      {
        /* 
          For the HeroBanner, we will be passing in the data we
          fetched from the Sanity client into the component as
          props IF data does actually exist. Since Sanity returns
          an array of Banner objects, we will access one of the
          banner documents with indexing.
        */
      }
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>

      {/*
        This div will an h2 and p element that will describe
        the best selling product currently on the website, and
        as well as display the actual product that the user
        can click to go to its page.
      */}
      <div className="products-heading">
        <h2>Best Selling Product</h2>
        <p>Headphones that amaze everyone!</p>
      </div>

      {/*
        This div will contain a mapping of Product components that
        the user can click to take to their respective pages.

        The product component will be mapped with the id serving as
        the key, and we will also pass the entire object element
        as a prop.
      */}
      <div className="products-container">
        {productsData?.map(
          (product) => <Product key={product._id} product={product}/>)}
      </div>

      {/*
        The FooterBanner component will have a prop similar to the
        HeroBanner in which we will only pass in IF there it actually
        exists.
      */}
      <FooterBanner footerBanner={bannerData.length && bannerData[0]}/>
    </>
  )
}

/*
  getServerSideProps is the function we need in order to utilize Data Fetching
  in a Next.js project. (Essentially, it will pre-fetch the data from the API before 
  the page is rendered.)

  The props that we will return will be injected into the Home page because
  of the custom _app component that passes a 'pageProps' object.
*/
export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]'
  const productsData = await client.fetch(productsQuery)
  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: { productsData, bannerData }
  }
}
export default Home