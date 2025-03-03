import { useEffect, useRef, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useMutation } from "@tanstack/react-query"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SigninForm from "../components/SigninForm"
import { toast } from "sonner"

interface Credentials {
  email: string,
  password: string,
  remember?: boolean
}

const Login = () => {
    const { user, login } = useAuth()
    const navigate = useNavigate()

    const signIn = useMutation({
      mutationFn: (credentials: Credentials) => {
        return fetch('/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials)
        })
      },
    })

    const { status } = signIn

    useEffect(() => {
      if (user) {
        navigate('/')
      }
    }, [user])

    const HandleLogin = async (credentials: Credentials) => {
      signIn.mutate(credentials, {
        onSuccess: async (response) => {
          if(response.ok) {
            const data = await response.json()
            login(data)
          }
          else {
            toast('Oops! Wrong credentials, try again.')
          }

        },
        onError: () => {
          toast('Oops! Something went wrong, try again.')
        }
      });
    }

    useEffect(() => {
      if(status === 'error') {
        toast('Invalid email or password')
      }
    }, [status])


  return (
    <div className='container mx-auto rounded-2xl p-8 h-dvh flex flex-col  justify-center'>
          <Card className="p-8">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>Enter your email and password to sign in</CardDescription>
            </CardHeader>
            <SigninForm HandleLogin={HandleLogin}/>
          </Card>
    </div>
  )
  
}

export default Login