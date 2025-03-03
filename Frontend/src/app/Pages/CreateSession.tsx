import React, { useEffect, useRef, useState } from 'react'
import AddExercises from '../components/AddExercises'
import { Exercise } from '../types/exercises'
import { useAuth } from '../../contexts/AuthContext'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Navbar from '../components/Navbar'

type CreateSessionProps = {
    title: string | undefined;
    user: string;
    exercises: Exercise[];
};


const CreateSession = () => {
  const { user } = useAuth()
  
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const sessionTitleRef = useRef<HTMLInputElement>(null)

  const createSession = useMutation({
    mutationFn: (sessionProps: CreateSessionProps) => {
      return fetch('/api/session/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionProps)
      })
    }
  })

    const HandleSessionSubmission = () => {

      if(!user) {
        return
      }

      const sessionProps: CreateSessionProps = {
        title: sessionTitleRef.current?.value,
        user,
        exercises
      }

      createSession.mutate(sessionProps)
    }

  return (
    <>
    <Navbar/>
    <div className='flex flex-col h-dvh gap-4 p-6'>
        <Input ref={sessionTitleRef} type="text" className="h-15 text-lg mb-2 font-bold" placeholder='Session Title'/>
        <AddExercises exercises={exercises} setExercises={setExercises}/>
        <Button onClick={HandleSessionSubmission} className='mt-auto h-12 text-lg'>Create Session</Button>
    </div>
    </>
  )
}

export default CreateSession