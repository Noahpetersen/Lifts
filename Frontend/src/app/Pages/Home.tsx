import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Home = () => {
  const { logout } = useAuth()


  return (
    <button className='cursor-pointer' onClick={logout}>Logout</button>
  )
}

export default Home