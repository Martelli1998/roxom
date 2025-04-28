import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'
import { useAuthContext } from '../contexts/AuthContext'

export default function Home() {
  const router = useRouter()
  const { login } = router.query
  const { user } = useAuthContext()

  // This is a reference to the Navbar component which we'll need to update
  // to expose a method to open the login modal
  // For now, this is just a placeholder and won't work until we update the Navbar component

  return (
    <div>
      <Head>
        <title>Roxom - Compete. Win. Get Rewards.</title>
        <meta name="description" content="Roxom - The World's First Bitcoin Exchange. Compete. Win. Get Rewards." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar autoOpenLogin={login === 'true'} />
      
      <main>
        <Hero />
        <Features />
      </main>

      <Footer />
    </div>
  )
} 