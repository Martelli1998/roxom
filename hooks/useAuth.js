import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Register a new user
  const register = async (name, email, password) => {
    try {
      setLoading(true)
      setError(null)
      
      // Sign up the user with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name, // Store name in user metadata as well
          },
        }
      })
      
      if (authError) throw authError
      
      // The user table will be populated in a more robust way
      // We have two options:
      // 1. Create a database trigger on auth.users to auto-populate public.users
      // 2. Create the user record when they first sign in instead of on registration
      
      // For simplicity, we'll just return success for now
      // The user profile can be created when they first sign in
      
      return { success: true }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Sign in existing user
  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      // After successful login, check if user profile exists, if not, create it
      if (data?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()
        
        // If profile doesn't exist, create it
        if (!profile) {
          await supabase.from('users').insert([
            {
              id: data.user.id,
              name: data.user.user_metadata?.name || email.split('@')[0],
              email: data.user.email,
              created_at: new Date().toISOString(),
            }
          ])
        }
      }
      
      return { success: true, user: data.user }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Sign out user
  const logout = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    register,
    login,
    logout,
  }
} 