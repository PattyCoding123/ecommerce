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
*/
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
