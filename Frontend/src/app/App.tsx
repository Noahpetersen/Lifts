import { useEffect } from 'react'
import './App.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <NavLink to="/home" end>
          <h1>Home</h1>
        </NavLink>
        <button onClick={() => logout()}>Sign in</button>
      </div>
    </>
  )
}

export default App
