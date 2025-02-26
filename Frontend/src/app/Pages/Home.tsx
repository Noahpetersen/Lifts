import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Home = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()


  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <button onClick={() => {navigate('/create')}}>Create Session</button>
      <button className='cursor-pointer' onClick={logout}>Logout</button>
    </div>
  )
}

export default Home