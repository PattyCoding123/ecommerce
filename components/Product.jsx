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

      That link element's href will be targeted towards
      a specific "slug", which is the product's unique
      page identifier. Thus, if we click on one of the
      product images, we will be taken towards their
      unique details page because of the slug.

      Inside the link, another div will be rendered which acts
      as the "product card" or the rectangular displays of the
      products on the webpage.

      Each "card" will contain an image element.
    */
    <div>
      {/*
        Notice how the href will is in the form a string
        template so that we can be taken to the product's
        details page using the slug.
      */}
      <Link href={`/product/${slug.current}`}>
        <div className={styles["product__card"]}>
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
          <p className={styles["product__card-name"]}>{name}</p>
          <p className={styles["product__card-price"]}>${price}</p>

        </div>
      </Link>
    </div>
  )
}

export default Product
