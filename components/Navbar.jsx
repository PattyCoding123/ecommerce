import React from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai'

import styles from '../styles/Navbar.module.scss'
import { Cart } from '../components'
import { useStateContext } from '../context/StateContext'

const Navbar = () => {

  const { showCart, setShowCart, totalQuantities } = useStateContext()

  /*
    The Navbar component will be a div that has 2 elements:
    1. A <p> tag for the logo (styled text) which contains
      a Link component that takes the user back to the Home page

    2. A <button> tag that is a responsive shopping bag. There
      is a nested <span> tag which indicates the number of items
      that are in the user's shopping cart which is represented
      by the totalQuantities global state.

    This will always appear at the top of the page.
  */
  return (
    <div className={styles["navbar__container"]}>
      <p className={styles["navbar__logo"]}>
        <Link href="/">Patrick's Web Store</Link>
      </p>

      {/*
        The button is responsible for making the shopping cart 
        component appear on the side of the user's screen. 
        For an onClick event, the button will pass
        a callback function which sets the showCart state 
        to true.
      */}
      <button 
        type="button"
        className={styles["navbar__shopping-icon"]}
        onClick={() => setShowCart(true)}>
        <AiOutlineShoppingCart />
        <span 
          className={styles["navbar__item-qty"]}
        >
          {totalQuantities}
        </span>
      </button>

      {/*
        We want to conditionally render the Cart component
        using the showCart global state.
      */}
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar