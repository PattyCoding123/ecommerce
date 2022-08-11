import React from 'react'
import Head from 'next/head' // Same thing as in HTML for page metadata

import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Patrick's Ecommerce Project</title>
        <meta name="description" content="An ecommerce project that includes payment functionality with Stripe."/>
      </Head>

      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout