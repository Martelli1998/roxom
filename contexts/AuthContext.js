import { createContext, useState, useEffect, useContext } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useAuth } from '../hooks/useAuth'

// Create context
const AuthContext = createContext()

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = useAuth()

  useEffect(() => {
    // Check for active session on load
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          throw error
        }
        
        setUser(session?.user || null)
      } catch (error) {
        console.error('Error checking authentication:', error.message)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)
        setLoading(false)
      }
    )

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe()
  }, [])

  // Get user profile data
  const getUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching user profile:', error.message)
      return null
    }
  }

  // Context values
  const value = {
    user,
    loading,
    getUserProfile,
    ...auth
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
} 