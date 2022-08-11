import React from 'react'
import Link from 'next/link' // We will use to link to the product's page

import { urlFor } from '../lib/client'
import styles from '../styles/Product.module.scss'

// We will destruct the prop into its components
const Product = ({ product: { image, name, slug, price }}) => {

  return (
    /*
      The component will be a div that contains a Link 
      element from Next.js

      Inside the link, another div will be rendered which acts
      as the "product card" or the rectangular displays of the
      products on the webpage.

      Each "card" will contain an image element.
    */
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className={styles.product_card}>
          {/*
            The image will be conditionally rendered
            as long as there is an actual image inside
            the image array field.

            If there is no image at all in the product document,
            then the alt will just be the product name.
          */}
          <img 
            src={urlFor(image && image[0])} 
            width={250} 
            height={250}
            alt={name}
          />

          {/*
            Below the image, we will display the product's name
            and the price of the product.
          */}
          <p className={styles.product_name}>{name}</p>
          <p className={styles.product_price}>${price}</p>

        </div>
      </Link>
    </div>
  )
}

export default Product