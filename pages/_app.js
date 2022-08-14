import '../styles/globals.scss'
import { Toaster } from 'react-hot-toast'

import { Layout } from '../components'
import { StateContext } from '../context/StateContext'

// The global stylings will now all apply to our components

/*
  Nest Component (current page component) inside
  the Layout component as the Layout component will help
  in formatting the page and providing Navbar at the top
  the footer at the bottom no matter what page we are at.

  We can access this nested Component via the { children }
  prop inside Layout.jsx

  Note: 'pageProps' is an object with the initial props that were
  preloaded for the page using a data fetching method.
  
    - For example, the Home page uses server-side rendering. Thus,
  it uses a data fetching method 'getServerSideProps' to get data 
  from Sanity in order to preload it on the page. The props we return
  from that method will be passed in the pageProps when
  the Home page is the current page being rendered on the screen.

  Then, wrap the entire App in our StateContext provider so that the states
  we want to keep track of will be available to the entire application.

  Include a <Toaster /> component inside the layout for the Toast notification.
*/
function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
   
}

export default MyApp
