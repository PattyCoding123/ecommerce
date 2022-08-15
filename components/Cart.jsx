import { React, useRef } from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShoppingCart } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'

import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe'

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart,
  toggleCartItemQuantity, onRemove } = useStateContext()

  // The following event handler will try and redirect the 
  // user to the Stripe checkout page with their cart.
  const handleCheckout = async () => {
    // Get an instance of a Stripe promise
    const stripe = await getStripe();

    // Make API request from our Next.js backend.
    // First argument is the API route, and the second is the initialization.
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Remember, we must stringify our data for the body
      body: JSON.stringify(cartItems),
    });

    // If our statusCode from the response is 500, return since
    // something went wrong on the server side.
    if(response.statusCode === 500) return;

    // Get our data by turning the response from the
    // API fetch into a JSON object.
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  /*
    The Cart Component will be visible throughout all pages in the 
    store.

    The Cart is represented with a div wrapper that wraps a container
    which will contain each section of the component. Furthermore, 
    two sections will be conditionally rendered depending on the 
    cartItems state.
  */
  return (
    <div className="cart__wrapper" ref={cartRef}>

      <div className="cart__container">
        {/*
          The button will always appear at the top left of the Cart component
          and when pressed, it will set the showCart state to false which
          will remove it off the screen.

          Additionally, it shows the number of total items that are currently
          in the user's cart right now.
        */}
        <button
          type="button"
          className="cart__button-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your items</span>
          <span className="cart-num-items">({totalQuantities})</span>
        </button>

        {/*
          The following div will only be rendered if there are 0 items in the
          cartItems state. It will contain an <h3> element that tells
          the user there are no items currently in the cart, and there 
          will be a button that will take the user to the Home page to 
          continue shopping.
        */}
        {cartItems.length === 0 && (
          <div className="cart__empty">
            <AiOutlineShoppingCart size={150} />
            <h3>Your shopping cart is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue shopping
              </button>
            </Link>
          </div>
        )}

        {/*
          The next div section will only be rendered if there is an item in the cart. 
          We will map over the cartItems state array and return a 'product' div.

          Each div will contain an image of the product, another div containing
          <h5> and <h4> elements for the name and price of the product, 
          a section of buttons to increase and decrease the quantity, and
          a delete button that will trigger the onRemove handler.
        */}
        <div className="product__container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product__div" key={item._id}>
              <img 
                src={urlFor(item?.image[0])}
                className="cart-product-image"
              /> 
              <div className="product__div-description">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    {/*
                      The following quantity modifiers are similar to the
                      modifiers in the [slug].js file. However, instead of 
                      invoking the increaseQty and decreaseQty event handlers,
                      they will invoke another method called toggleCartItemQuantity
                      which is specificly for handling the logic for items while
                      we are in the cart view mode.
                    */}
                    <p className="quantity__description">
                      <span 
                        className="minus" 
                        onClick={() => toggleCartItemQuantity(item._id, 'dec')}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className="num">
                        {item.quantity}
                      </span>
                      <span 
                        className="plus" 
                        onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item._id)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*
          This section of the cart container will only render if there items
          in the cart. It will contain a div that acts as the container, and 
          in that div will be two more divs to house the price information
          and a button.

          For the price div, two <h3> elements will display the user's subtotal.

          For the button div, it will take the user to the payment page integrated
          with Stripe.
        */}
        {cartItems.length >= 1 && (
          <div className="cart__bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn"
                onClick={handleCheckout}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart