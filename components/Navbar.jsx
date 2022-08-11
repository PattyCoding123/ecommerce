import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import styles from '../styles/Navbar.module.scss'

const Navbar = () => {
  /*
    The Navbar component will be a div that has 2 elements:
    1. A <p> tag for the logo (styled text) which contains
      a Link component that takes the user back to the Home page

    2. A <button> tag that is a responsive shopping bag. There
      is a nested <span> tag which indicates the number of items
      that are in the user's shopping cart.

    This will always appear at the top of the page.
  */
  return (
    <div className={styles["navbar__container"]}>
      <p className={styles["navbar__logo"]}>
        <Link href="/">Patrick's Web Store</Link>
      </p>

      <button 
        type="button"
        className={styles["navbar__shopping-icon"]}
        onClick="">
        <AiOutlineShopping />
        <span 
          className={styles["navbar__item-qty"]}
        >
          1
        </span>
      </button>
    </div>
  )
}

export default Navbar