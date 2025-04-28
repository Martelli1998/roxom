import '../styles/globals.css'
import Head from 'next/head'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Roxom - Compete. Win. Get Rewards.</title>
        <link rel="icon" href="https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://roxom.com/" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp 