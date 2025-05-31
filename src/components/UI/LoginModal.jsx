import { useState } from 'react'
import { useAuth } from '../../lib/hooks/useAuth'
import Button from '../base/Button'
import styles from './LoginModal.module.css'

export default function LoginModal({ onClose }) {
  const { login, signup } = useAuth()
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const { error } = isSignup
      ? await signup(email, password)
      : await login(email, password)

    if (error) setError(error.message)
    else onClose();
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalOverlay} onClick={onClose}></div>
      <div className={styles.modalContent}>
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button> */}
           <Button
            text={isSignup ? 'Sign Up' : 'Login'}
            backgroundColor="#4CAF50"
            type="submit"
            rounded
          />
        </form>
        <p>
          {isSignup ? 'Already have an account?' : 'New user?'}{' '}
          {/* <button onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Login' : 'Sign Up'}
          </button> */}
          <Button
            text={isSignup ? 'Login' : 'Sign Up'}
            backgroundColor="white"
            onClick={() => setIsSignup(!isSignup)}
          />
        </p>
      </div>
    </div>
  )
}
