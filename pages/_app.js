import '../styles/globals.scss'

// The global stylings will now all apply to our components
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
