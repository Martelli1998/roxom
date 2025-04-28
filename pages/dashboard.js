import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProtectedRoute from '../components/ProtectedRoute'
import { useAuthContext } from '../contexts/AuthContext'

const Dashboard = () => {
  const { user, getUserProfile, logout } = useAuthContext()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const profileData = await getUserProfile(user.id)
        setProfile(profileData)
      }
      setLoading(false)
    }

    fetchProfile()
  }, [user, getUserProfile])

  const handleLogout = async () => {
    await logout()
    // Redirect is handled by ProtectedRoute component
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <main className="dashboard-container">
        <div className="dashboard-content">
          <h1>Welcome to your Dashboard</h1>
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <div className="user-profile">
              <h2>Your Profile</h2>
              {profile ? (
                <div className="profile-details">
                  <p><strong>Name:</strong> {profile.name}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Member since:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
                </div>
              ) : (
                <p>No profile information found.</p>
              )}
              <button className="logout-button" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  )
}

export default Dashboard 