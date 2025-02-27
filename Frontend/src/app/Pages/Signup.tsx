import { useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useMutation } from '@tanstack/react-query'

interface newUser {
  username: string,
  email: string,
  password: string
}

const SignUp = () => {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  
  const signup = useMutation({
    mutationFn: (newUser: newUser) => {
        return fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser)
        })
    },
    onSuccess: async (response) => {
      const data = await response.json()
      login(data)
      navigate('/signin')
    },
  })

  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  })

  const HandleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = usernameRef.current?.value 
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    if (!username || !email || !password) {
      alert('Please fill all fields')
      return
    }

    const newUser: newUser = {
      username,
      email,
      password
    }

    signup.mutate(newUser);
  };

  return (
    <div className='container mx-auto bg-zinc-700 rounded-2xl p-8'>
        <h1 className='mb-10'>Signup</h1>
        <form className='flex flex-col space-y-6 min-w-80 text-zinc-900' onSubmit={HandleSignup}>
            <input ref={usernameRef} type='text' placeholder='Username' className='p-2 rounded-lg bg-zinc-300 placeholder:text-zinc-800 ' />
            <input ref={emailRef} type='email' placeholder='Email' className='p-2 rounded-lg bg-zinc-300 placeholder:text-zinc-800' />
            <input ref={passwordRef} type='password' placeholder='Password' className='p-2 rounded-lg bg-zinc-300 placeholder:text-zinc-800' />
            <button type="submit" className='p-2 text-white rounded-lg bg-zinc-900 hover:bg-sky-700 cursor-pointer transition duration-300'>Signup</button>
        </form>
        <NavLink to={"/signin"}>
          <p className='mt-4'>already have an account? <span className='font-bold'>Sign in</span></p>
        </NavLink>
    </div>
  )
}

export default SignUp