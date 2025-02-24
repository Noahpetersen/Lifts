import { useRef } from 'react'
import { NavLink } from 'react-router-dom'

interface newUser {
  username: string,
  email: string,
  password: string
}

const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

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

    const response = await fetch('http://127.0.0.1:8000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    })
    
    if (response.ok) {
      const data = await response.json()
      alert(data)
    } else {
      const data = await response.json()
      alert(data)
    }
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
          <p className='mt-4'>already have an account? Sign in</p>
        </NavLink>
    </div>
  )
}

export default SignUp