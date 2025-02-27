import { data, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useQuery } from '@tanstack/react-query'

type Session = {
  id: number,
  name: string,
}

type Sessions = Session[]

const Home = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const {data, isFetched, isError } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const response = await fetch('/api/session/get')
      return (await response.json()) as Session[]
    }
  })

  if (isFetched && data) {
    return (
      <div>
        <ul>
          {data.map((session) => {
            return (
              <li key={session.id}>
                <p>{session.name}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <p>You dont have any sessions yet.</p>
        <button onClick={() => {navigate('/create')}}>Create Session</button>
      </div>)
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <button onClick={() => {navigate('/create')}}>Create Session</button>
      <button className='cursor-pointer' onClick={logout}>Logout</button>
    </div>
  )
}

export default Home