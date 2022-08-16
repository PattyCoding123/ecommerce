import { React, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'

import { useStateContext } from '../context/StateContext'
import { runConfetti } from '../lib/utils'

const success = () => {
	/*
		When the success page is rendered, it will reset many states for the user 
		to coincide with their completed purchase.

		It will clear the local storage, set quantity state to 1, empty the cartItems
		state, set totalPrice and totalQuantities state to 0, and run confetti.
	*/
	useEffect(() => {
		const { setCartItems, setTotalPrice, setTotalQuantities, resetQty } = useStateContext()
		resetQty()
		setCartItems([])
		setTotalPrice(0)
		setTotalQuantities(0)
		runConfetti()
	}, [])

  return (
		/*
			The success page will contain a wrapper which includes a div that will
			contain the UI elements that are displayed to the user after a successful
			purchase.
		*/
    <div className="success-wrapper">
			{/*
				For the success div, there will be:
				1. A <p> element for the 'complete' shopping icons
				2. An <h2> element to show a thank you message
				3. A <p> element to express gratitude
				4. A <p> element to show the purpose of the project again
				5. A Link component that is connected to a button element
					which will take the user back to the Home page of the application.

			*/}
			<div className="success">
				<p className="icon">
					<BsBagCheckFill />
				</p>
				<h2>Thank you for your support!</h2>
				<p className="gratitude-msg">We appreciate you!</p>
				<p className="description">This is a personal project for educational purposes.</p>
				<Link href="/">
					<button type="button" width="300px" className="btn">
						Continue Shopping
					</button>
				</Link>
			</div>
		</div>
  )
}

export default success