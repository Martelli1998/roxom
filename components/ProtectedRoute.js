import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthContext } from '../contexts/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated after loading
    if (!loading && !user) {
      // Redirect to home page with query param to open login modal
      router.push('/?login=true')
    }
  }, [user, loading, router])

  // Show loading or nothing while checking authentication
  if (loading || !user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  // If authenticated, show the protected content
  return <>{children}</>
}

export default ProtectedRoute 