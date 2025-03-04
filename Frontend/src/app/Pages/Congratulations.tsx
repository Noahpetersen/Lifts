import { Button } from '@/components/ui/button'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Congratulations = () => {
    const navigate = useNavigate()

  return (
    <div className='flex flex-col justify-center items-center h-dvh gap-20'>
        <div className='flex flex-col items-center'>
            <h1 className='text-4xl font-bold text-primary'>Well done!</h1>
            <p className='text-lg text-zinc-400'>You have completed your workout!</p>
        </div>
        <Button variant={"outline"} className='text-lg justify-self-end' onClick={() => {navigate('/')}}>Continue</Button>
    </div>
  )
}

export default Congratulations