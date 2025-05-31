import { useState } from 'react'
import { useAuth } from '../../lib/hooks/useAuth'
import Button from '../base/Button'
import LoginModal from '../UI/LoginModal'

export default function Header() {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleAuthClick = () => {
    if (user) logout() ;
    else setShowModal(true);
  }

  return (
    <header className="header">
      <h1 className="header-title">Weather App</h1>
      <p className="header-subtitle">Get the latest weather updates</p>
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
};
