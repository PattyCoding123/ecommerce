import Stripe from 'stripe'

// Create a new Stripe instance using the Stripe object
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// export the handler function when we make an API call to the stripe.js file.
// This function returns a promise.
export default async function handler(req, res) {
	// If our request method is POST, then we will utilize a try-catch block
	// to pass our information for user's payment session.
  if (req.method === 'POST') {
    try {
			const params = {
				submit_type: 'pay',
				mode: 'payment',
				payment_method_types: ['card'],
				billing_address_collection: 'auto',
				// shipping rates handled on the account console
				shipping_options: [
					{ shipping_rate: 'shr_1LWvhoF8RzuzhPcOwX2M2hoq' },
					{ shipping_rate: 'shr_1LWviyF8RzuzhPcO0I3wF72m' },
				],

				// For our line items, we will use the .map function on req.body (cartItems state) 
				// and set the information of the items for Stripe
        line_items: req.body.map((item) => {
					// In order to display an image of the product, we must replace certain
					// values of the asset reference.
					const img = item.image[0].asset._ref
					const newImage = img.replace('image-', `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/`).replace('-webp','.webp')

					/*
						For each item, we will return an object which has members for price data,
						product data, adjustable quantity, and the initial quantity.

						These are used by Stripe to display to the user what item they are
						buying, their current quantity, and the prices.

					*/
					return {
						price_data: {
							currency: 'usd',
							product_data: { 
								name: item.name,
								images: [newImage],
							},
							// for unit_amount, we must convert our unties
							// to pennies.
							unit_amount: item.price * 100,
						},
						adjustable_quantity: {
							enabled: true,
							minimum: 1,
						},
						// Initial quantity of item that was in the user's
						// cart before checkout.
						quantity: item.quantity,
					}

				}),

				// Here, we have the options to redirect the user to 
				// another url depending if they completed or cancelled their purchase.
        success_url: `${req.headers.origin}/success`, // Send user to success page.
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}