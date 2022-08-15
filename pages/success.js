import { React, useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'

import { useStateContext } from '../context/StateContext'
import { runConfetti } from '../lib/utils'

const success = () => {
	const { setCartItems, setTotalPrice, setTotalQuantities, resetQty } = useStateContext()
	
	useEffect(() => {
		localStorage.clear()
		resetQty()
		setCartItems([])
		setTotalPrice(0)
		setTotalQuantities(0)
		runConfetti()
	}, [])

  return (
    <div className="success-wrapper">
			<div className="success">
				<p className="icon">
					<BsBagCheckFill />
				</p>
				<h2>Thank you for your support!</h2>
				<p className="email-msg">We appreciate you!</p>
				<p className="description">This was a project for educational purchases.</p>
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