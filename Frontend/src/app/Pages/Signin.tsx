import { useRef } from "react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

interface Credentials {
  email: string,
  password: string,
  remember?: boolean
}

const Login = () => {
    const { login } = useAuth()

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const rememberMeRef = useRef<HTMLInputElement>(null)

    const HandleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const remember = rememberMeRef.current?.checked

    if (!email || !password) {
        alert('Please fill all fields')
        return
    }

    const credentials: Credentials = {
        email,
        password,
        remember
    }

    try {
      const response = await fetch('/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials)
      })

      if (response.ok) {
        const data = await response.json()
        login(data)
        alert(data)
      } else {
        const data = await response.json()
        alert(data)
      }
    } catch (error) {
      console.error(error)
    }




    }


  return (
    <div className='container mx-auto bg-zinc-700 rounded-2xl p-8'>
        <h1 className='mb-10'>Signup</h1>
        <form className='flex flex-col space-y-6 text-zinc-900' onSubmit={HandleLogin}>
            <input ref={emailRef} type='text' placeholder='email' className='p-2 rounded-lg bg-zinc-300 placeholder:text-zinc-800 ' />
            <input ref={passwordRef} type='password' placeholder='Password' className='p-2 rounded-lg bg-zinc-300 placeholder:text-zinc-800' />
            <div className="flex items-center">
              <input ref={rememberMeRef} name="rememberMe"type='checkbox' className='p-2 rounded-lg bg-zinc-300 placeholder:text-zinc-800' />
              <label htmlFor="rememberMe" className='ml-2 text-zinc-200'>Remember Me</label>
            </div>
            <button type="submit" className='p-2 text-white rounded-lg bg-zinc-900 hover:bg-sky-700 cursor-pointer transition duration-300'>Sign In</button>
        </form>
        <NavLink to={"/signup"}>
          <p className='mt-4'>Sign Up</p>
        </NavLink>
    </div>
  )
}

export default Login