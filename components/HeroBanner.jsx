import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'
import styles from '../styles/HeroBanner.module.scss'

const HeroBanner = ({ heroBanner: { smallText, midText, largeText1, image, 
   product, buttonText, desc } }) => {
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
    <div className={styles["hero__banner-container"]}>
      <div>
        <p className={styles["hero__banner-product"]}>
          {smallText}
        </p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <img src={urlFor(image)} alt="banner-product"/>


        {/*
          For the hero banner, make the link href property take a dynamic
          string which changes depending on the heroBanner's product field
        */}
        <div>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <div className={styles["hero__banner-desc"]}>
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
