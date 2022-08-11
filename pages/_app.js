import '../styles/globals.scss'

import { Layout } from '../components'

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
*/
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
