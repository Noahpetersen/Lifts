import { data, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { EffectCallback, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import SessiontListItem from '../components/SessiontListItem'
import Navbar from '../components/Navbar'
import { Exercise } from '../types/exercises'

type Session = {
  id: number,
  name: string,
  exercises: Exercise[]
}

type Sessions = Session[]

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { data: sessions, isFetched, isLoading, isError } = useQuery<Session[]>({
    queryKey: ['sessions'],
    queryFn: async () => {
      const response = await fetch('/api/session/get');
      if (!response.ok) throw new Error("Failed to fetch sessions");
      return response.json();
    },
  });

  const StartSession = (session: Session) => {
    navigate(`/session/${session.id}`);
  };

  // Show loading state while fetching
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Loading sessions...</p>
      </div>
    );
  }

  // Handle error state
  if (isError || !sessions || sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>You don't have any sessions yet.</p>
        <button onClick={() => navigate('/create')}>Create Session</button>
      </div>
    );
  }

  if(isFetched) {
    console.log(sessions)
  }

  // Successfully fetched sessions
  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center h-dvh p-6">
      <ul className='w-full space-y-5'>
        {sessions.map((session) => (
            <SessiontListItem onClick={() => StartSession(session)} key={session.id} sessionName={session.name} numberOfExercises={session.exercises.length}/>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Home;
