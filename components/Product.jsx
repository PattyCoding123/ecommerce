import React from 'react'
import Link from 'next/link' // We will use to link to the product's page

import { urlFor } from '../lib/client'
import styles from '../styles/Product.module.scss'
import { useStateContext } from '../context/StateContext'

// We will destruct the prop into its components
const Product = ({ product: { image, name, slug, price }}) => {
  const { resetQty } = useStateContext();

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
        Notice how the href is in the form of a string
        template which will allow us to be taken to the product's
        details page using its slug.

        Because it is wrapped around the div of the product
        card on the home page, the user can click on 
        anywhere on the product card and it will take
        them to the product's slug page.

        Additionally, whenever the user clicks on the div
        for the link, it will activate the resetQty function
        which resets the global item state to 1.
      */}
      <Link href={`/product/${slug.current}`}>
        <div className={styles["product__card"]} onClick={resetQty}>
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
