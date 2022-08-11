import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client' 
import styles from '../styles/FooterBanner.module.scss'

// Destructure the footerBanner prop into all its components.
const FooterBanner = ({ footerBanner: {
  discount, largeText1, largeText2, saleTime, 
  smallText, midText, product, buttonText, image, desc} }) => {

  /*
    The FooterBanner Component will have 1 div acting as the main
    div which will have another div(banner-desc) that contains all the 
    information regarding the banner product

    The banner-desc div contains two divs that separate the left side
    of the banner and the right side.

    On the left side of the banner, we will render the discount information,
    the largeText descriptions, and the time the product will stay on sale.

    On the right side of the banner, we will render the name, sale text,
    description of the product, AND a button to the product's page.

    Finally, an image will be rendered in the middle of the descriptions.
  */
  
  return (
    <div className={styles.footer_banner_container}>
       <div className={styles.left}>
         <p>{discount}</p>
         <h3>{largeText1}</h3>
         <h3>{largeText2}</h3>
         <p>{saleTime}</p>
       </div>

       <div className={styles.right}>
         <p>{smallText}</p>
         <h3>{midText}</h3>
         <p>{desc}</p>
         <Link href={`/product/${product}`}>
           <button type="button">{buttonText}</button>
         </Link>
       </div>

       <img 
         src={urlFor(image)} alt="banner-product"
       />
    </div>
  )
}

export default FooterBanner