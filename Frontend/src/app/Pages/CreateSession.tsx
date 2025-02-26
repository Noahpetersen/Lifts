import React, { useEffect, useRef, useState } from 'react'
import AddExercises from '../components/AddExercises'
import { Exercise } from '../types/exercises'
import { useAuth } from '../../contexts/AuthContext'

type CreateSessionProps = {
    title: string;
    user: string;
    exercises: Exercise[];
};


const CreateSession = () => {
  const { user } = useAuth()
  
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const sessionTitleRef = useRef<string>('')

    const HandleFormSubmit = () => {

      if(!user) {
        return
      }

      const sessionProps: CreateSessionProps = {
        title: sessionTitleRef.current,
        user,
        exercises
      }

        try {
          fetch('/api/session/create', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(sessionProps)
          })
        }
        catch (error) {

        }
    }

  return (
    <div>
        <input type="text" className='bg-white placeholder:text-zinc-700 text-zinc-900' placeholder='Session Title'/>
        <AddExercises exercises={exercises} setExercises={setExercises}/>
        <button className='bg-sky-700 p-2 rounded-2xl' onClick={HandleFormSubmit}>Create Session</button>
    </div>
  )
}

export default CreateSession