import React from 'react'

import { Product, FooterBanner, HeroBanner } from '../components'

const Home = () => {
  return (
    /* 
      The Home Page will have a few sections:
      1. The hero banner which will be styled
      2. A div containing the best-selling products
      3. A div that contains all of the best-selling produts
      4. A Sale banner
    */
    <>
      <HeroBanner />

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
        This div will contain a mapping of product components that
        the user can click to take to their respective pages.
      */}
      <div className="products-container">
        {['Product 1', 'Product 2'].map(
          (product) => product)}
      </div>

      <FooterBanner />
    </>
  )
}

export default Home