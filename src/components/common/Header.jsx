import styles from './Header.module.css'
import { useState } from 'react'
import { useAuth } from '../../lib/hooks/useAuth'
import Button from '../base/Button'
import LoginModal from '../UI/LoginModal'

export default function Header() {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleAuthClick = () => {
    if (user) logout();
    else setShowModal(true);
  }

  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles['header-title']}>Weather App</h1>
      </div>
      <Button
        backgroundColor={'#007bff'}
        onClick={handleAuthClick}
        text={user ? 'Logout' : 'Login / Sign Up'}
        rounded={true}
        type="button"
      />
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </header>
  )
}
