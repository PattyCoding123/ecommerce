import { React, createContext, 
  useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

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

	// Product and its index we want to update in the cart!
	let foundProduct

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

	// Event handler which resets quantity state to 1.
	const resetQty = () => {
		setQuantity(1)
	}

	// Event handler which takes in a product item and the quantity and tries
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

		// Create toast notification.
		toast.success(`${qty} ${product.name} added to the cart.`)
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
					quantity: cartProduct.quantity + qty
				}

				// If we didn't encounter the product, just return the same object with 
				// no modifications.
				return cartProduct
			})

			// Update the cartItems state with the new array
			setCartItems(updateCartItems)
		} else {
			/*
				If the item does not exist in the cartItems state, set the quantity
				of it as a new member variable and set the cartItems array to include
				the product using the array spread and object spread notation.
			*/
			product.quantity = qty
			setCartItems([...cartItems, { ...product }])
		}
	}

	// Event handler that will completely remove the found product from
	// the user's shopping cart and change the price accordiungly.
	const onRemove = (id) => {
		// use the .find() method to find the item we need to remove from the cart
		// by comparing each item's id to the input id.
		foundProduct = cartItems.find((item) => item._id === id)

		// Use the filter method to remove the item from the cart whose id
		// is equal to the input id.
		let newCartItems = cartItems.filter((item) => item._id !== id)

		/*
			For each setState method, we will first set the new cartItems state to be
			equal to the newCartItems array.

			For totalPrice state, we will return the previous state and subtract the
			removed item's cumulative total from it.

			For totalQuantities, we will return the previous state without the quantity
			of the removed product.
		*/
		setCartItems(newCartItems)
		setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
	}

	// Event handler that will change the item quantities in the user's cart.
	// The item's id and the value of the change (inc/dec) must be passed inside.
	const toggleCartItemQuantity = (id, value) => {

		// use the .find() method to find the item we need to remove from the cart
		// by comparing each item's id to the input id.
		foundProduct = cartItems.find((item) => item._id === id)

		// Set a new variable to hold the new array representing the cartItems state
		let newCartItems
		if (value === 'inc') {

			/*
				If the user pressed the + button, we will first call the .map array on the cartItems
				state and return either the same item, OR if we found the current product we are 
				modifying, we will return a new object at its place with the same properties and
 				a new updated quantity (plus 1). This way, we do not need to worry about 
				items being moved around when changed inside the cart.

				Then, we will set all the new states:
				1. set cartItems state to be the newCartItems array
				2. set totalPrice to be the previous state plus the current product price.
				3. set totalQuantities to be the previous state plus 1
			*/
			newCartItems = cartItems.map((item) => 
				(item._id === foundProduct._id ? {...item, quantity: foundProduct.quantity + 1} : item))
			setCartItems(newCartItems)
			setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
			setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
		} else {

			/*
				If the user pressed the 0 button, we will  call the .map array on the cartItems
				state and return either the same item, OR if we found the current product we are 
				modifying, we will return a new object at its place with the same properties and
				a new updated quantity (minus 1). This way, we do not need to worry about 
				items being moved around when changed inside the cart.

				Then, we will set all the new states:
				1. set cartItems state to be the newCartItems array
				2. set totalPrice to be the previous state minus the current product price.
				3. set totalQuantities to be the previous state minus 1
			*/
			if (foundProduct.quantity > 1) {
				newCartItems = cartItems.map((item) => 
					(item._id === foundProduct._id ? {...item, quantity: foundProduct.quantity - 1} : item))
				setCartItems(newCartItems)
				setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
				setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
			}
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
				setShowCart,
				setCartItems,
				setTotalPrice,
				setTotalQuantities,
				increaseQty,
				decreaseQty,
				resetQty,
				onAdd,
				toggleCartItemQuantity,
				onRemove,
      }}
    >
			{children}
    </Context.Provider>
  )
}

// useStateContext function  makes it easier for us to grab 
// the state context since we use the useContext hook.
export const useStateContext = () => useContext(Context)