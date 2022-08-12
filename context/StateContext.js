import { React, createContext, 
  useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

// Create Context Component that we will use in our
// StateContext.
const Context = createContext(); 

// Our StateContext will take one parameter which
// is the children components nested inside it.
export const StateContext = ({ children }) => {
  /*
    Our stateContext will handle a lot of states:

    1. A state to indicate if the cart is being shown.
    2. A state to indicate the items in our cart which
        will be tracked using localStorage.
    3. A state for the current total price of the cart.
    4. A state for the total number of items we are working with.
    5. A state for the quantity for each individual item
  */
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [quantity, setQuantity] = useState(1)

	// Event handler which increases the quantity state by 1.
	const increaseQty = () => {
		setQuantity((prevQuantity) => prevQuantity + 1)
	}

	// Event handler which decreases the quantity state by 1.
	// If quantity already equals 1, return 1.
	const decreaseQty = () => {
		setQuantity((prevQuantity) => {
			if (prevQuantity - 1 < 1) return 1
	
			return prevQuantity - 1
		})
	}

	// Event handler which resets quantity state to 0.
	const resetQty = () => {
		setQuantity(1)
	}

	// Event handler which takes in a product and the quantity and tries
	// to put it into the cart and sets the new pricing and total quantities.
	const onAdd = (product, qty) => {
		// Check if the item is already in the cart.
		const checkProductInCart = cartItems.find((item) => item._id === product._id) 

		// Set the new TotalPrice state of the cart by adding to the prevTotalPrice
		// the quantity*product price.
		setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price*qty)

		// Set the new TotalQuantities state by just adding the qty to the previous
		// total quantities.
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + qty)

		/*
		 	If the item is already in the cart, map through the cartItems state
			and just update the current quantity of the product using object spread
			notation. Each element in the cartItems array is a product object 
			(from the Sanity schema) with a new member that describes the current 
			quantity of it in the cart.
		*/
		if (checkProductInCart) {

			const updateCartItems = cartItems.map((cartProduct) => {
				if(cartProduct._id === product._id) return {
					...cartProduct,
					quantity: cartProduct.quantity + quantity
				}
			})

			// Update the cartItems state with the new array and
			// create a toast notirication.
			setCartItems(updateCartItems)
			toast.success(`${qty} ${product.name} added to the cart.`)

		} else {
			/*
				If the item does not exist in the cartItems state, set the quantity
				of it as a new member and set the cartItems array to include
				product using the array spread and object spread notation.
			*/
			product.quantity = qty
			setCartItems([...cartItems, { ...product }])
		}
	}
  /* 
		We will  return a Context.Provider component that wraps
		around the children components which we have passed in stateContext.
		
		The values attributes are all the values we want to 
		make available to the children components.

		For the values to actually be usable by the components, we need
		to wrap our application with this Context.Provider.
	*/
  return (
    <Context.Provider
      value={{
        showCart,
				cartItems,
				totalPrice,
				totalQuantities,
				quantity,
				increaseQty,
				decreaseQty,
				resetQty,
				onAdd,
      }}
    >
			{children}
    </Context.Provider>
  )
}

// useStateContext makes it easier for us to grab the state context.
export const useStateContext = () => useContext(Context)