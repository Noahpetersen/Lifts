import { useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useMutation } from '@tanstack/react-query'
import SignupForm from '../components/SignupForm'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
      if (response.ok) {
        const data = await response.json()
        login(data)
        navigate('/signin')
      }
    },
  })

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  })

  const HandleSignup = async (newUser: newUser) => {
    signup.mutate(newUser);
  };

  return (
    <div className='container mx-auto rounded-2xl p-8 h-dvh flex flex-col  justify-center'>
        <Card className="p-8">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Create your account and get started!</CardDescription>
          </CardHeader>
          <SignupForm HandleSignup={HandleSignup}/>
        </Card>
    </div>
  )
}

export default SignUp