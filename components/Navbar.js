import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuthContext } from '../contexts/AuthContext'

const Navbar = ({ autoOpenLogin = false }) => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [authMessage, setAuthMessage] = useState({ type: '', message: '' })
  const { loading, error, register, login, logout, user } = useAuthContext()

  // Handle auto-open login modal from query param
  useEffect(() => {
    if (autoOpenLogin && !user) {
      setShowLoginModal(true)
    }
  }, [autoOpenLogin, user])

  const handleLoginClick = () => {
    setShowLoginModal(true)
  }

  const handleRegisterClick = () => {
    setShowRegisterModal(true)
  }

  const handleCloseModal = () => {
    setShowLoginModal(false)
    setShowRegisterModal(false)
    setAuthMessage({ type: '', message: '' })
  }

  const switchToRegister = (e) => {
    e.preventDefault()
    setShowLoginModal(false)
    setShowRegisterModal(true)
    setAuthMessage({ type: '', message: '' })
  }

  const switchToLogin = (e) => {
    e.preventDefault()
    setShowRegisterModal(false)
    setShowLoginModal(true)
    setAuthMessage({ type: '', message: '' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setAuthMessage({ type: '', message: '' })

    // Form validation
    if (formData.password !== formData.confirmPassword) {
      setAuthMessage({ type: 'error', message: 'Passwords do not match' })
      return
    }

    if (formData.password.length < 6) {
      setAuthMessage({ type: 'error', message: 'Password must be at least 6 characters' })
      return
    }

    try {
      const result = await register(formData.name, formData.email, formData.password)
      
      if (result.success) {
        setAuthMessage({ 
          type: 'success', 
          message: 'Registration successful! Please check your email to confirm your account.' 
        })
        // Clear form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
      } else {
        setAuthMessage({ type: 'error', message: result.error || 'Registration failed' })
      }
    } catch (error) {
      setAuthMessage({ type: 'error', message: error.message || 'Registration failed' })
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setAuthMessage({ type: '', message: '' })

    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        handleCloseModal()
        // Optionally redirect or update UI for logged in user
      } else {
        setAuthMessage({ type: 'error', message: result.error || 'Login failed' })
      }
    } catch (error) {
      setAuthMessage({ type: 'error', message: error.message || 'Login failed' })
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header>
      <nav>
        <div className="logo-container">
          <svg className="icon-logo" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" fill="none">
            <path clipRule="evenodd" d="M406.591 196.397C431.144 196.397 451.048 176.493 451.048 151.94C451.048 127.387 431.144 107.483 406.591 107.483C382.039 107.483 362.135 127.387 362.135 151.94C362.135 176.493 382.039 196.397 406.591 196.397ZM318.132 294.628C320.214 296.712 323.042 297.886 325.988 297.886H439.916C446.057 297.886 451.032 292.91 451.032 286.769V214.12H356.868C353.915 214.12 351.087 212.947 349.006 210.862C336.462 198.323 290.199 152.06 254.206 116.064C252.124 113.979 249.296 112.806 246.344 112.806H166.634C157.993 121.449 151.466 127.974 151.466 127.974C151.466 127.974 294.598 271.099 318.132 294.628ZM193.862 217.37C191.78 215.285 188.952 214.112 186.006 214.112H72.0781C65.9375 214.112 60.9622 219.088 60.9622 225.228V297.878L155.133 297.878C158.079 297.878 160.907 299.051 162.989 301.136C170.565 308.709 190.441 328.584 212.928 351.069C227.672 365.813 243.538 381.678 257.795 395.934C259.877 398.018 262.705 399.192 265.651 399.192H345.361C354.002 390.548 360.529 384.024 360.529 384.024C360.529 384.024 217.397 240.899 193.862 217.37ZM60.9526 360.06C60.9526 335.507 80.8565 315.603 105.409 315.603C129.962 315.603 149.866 335.507 149.866 360.06C149.866 384.613 129.962 404.517 105.409 404.517C80.8565 404.517 60.9526 384.613 60.9526 360.06Z" fill="#A576FA" fillRule="evenodd"/>
          </svg>
          <div className="logo">Roxom</div>
        </div>
        <div className="nav-links">
          <Link href="https://roxom.com/terminal">Markets</Link>
          <Link href="https://roxom.com/trade" className="dropdown-link">Trade</Link>
          <Link href="https://roxom.com/competitions">Competitions</Link>
          <Link href="https://roxom.com/about">About</Link>
          {user && <Link href="/dashboard">Dashboard</Link>}
        </div>
        <div className="auth-buttons">
          <button id="bonusBtn" className="bonus-btn">1000 USD in BTC</button>
          <button className="theme-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </button>
          {user ? (
            <button className="sign-in-button" onClick={handleLogout}>Sign Out</button>
          ) : (
            <button className="sign-in-button" onClick={handleLoginClick}>Sign In</button>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Login</h2>
            {authMessage.message && (
              <div className={`auth-message ${authMessage.type}`}>
                {authMessage.message}
              </div>
            )}
            <form id="login-form" onSubmit={handleLoginSubmit}>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email" 
                required 
              />
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password" 
                required 
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            <p className="form-footer">Don't have an account? <a href="#" onClick={switchToRegister}>Register</a></p>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Create Account</h2>
            {authMessage.message && (
              <div className={`auth-message ${authMessage.type}`}>
                {authMessage.message}
              </div>
            )}
            <form id="register-form" onSubmit={handleRegisterSubmit}>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name" 
                required 
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email" 
                required 
              />
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password" 
                required 
              />
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password" 
                required 
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
            <p className="form-footer">Already have an account? <a href="#" onClick={switchToLogin}>Sign in</a></p>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar 