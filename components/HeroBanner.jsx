import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const HeroBanner = ({ heroBanner }) => {
  return (
    /*
      The following div is the hero banner container which contains a
      div that has a few elements:
      1. The name of the product (smallText)
      2. The event name (midText)
      3. h1 text (largeText1)
      4. An image of the product
      5. Another div with a Link (Next.js) that takes the user
      to the product page. The link will wrap around a button.
      There will also be a description in this div.
      
      Because we are taking in a heroBanner object as a prop, all
      the data will be coming from whatever was passed into the
      heroBanner object by Sanity.
    */
    <div className="hero-banner-container">
      <div>
        <p className="solo-product">
          {heroBanner.smallText}
        </p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} alt="banner-product" className="hero-banner-image" />


        {/*
          For the hero banner, make the link href property take a dynamic
          string which changes depending on the heroBanner's product field
        */}
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="description">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner