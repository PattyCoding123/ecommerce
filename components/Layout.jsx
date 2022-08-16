import React from 'react'
import Head from 'next/head' // Same thing as in HTML for page metadata

import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    /*
      The layout component will be a div containing a:
      1. Head component with the metadata of the webpage
      2. header tag which contains the Navbar component
      3. The main section which contains whatever page we are on.
        which is done by using the children prop!
      4. A footer tag which contains our footer component 
    */
    <div className="layout-padding">
      <Head>
        <title>Patrick's Ecommerce Project</title>
        <meta name="description" content="An ecommerce project that includes payment functionality with Stripe."/>
      </Head>

      <header>
        <Navbar />
      </header>
      <main className="main__container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout