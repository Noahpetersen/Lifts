import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '@/components/ui/form'
import { NavLink } from 'react-router-dom'

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember: z.boolean().optional()
})

type Credentials = z.infer<typeof userSchema>

type SigninFormProps = {
    HandleLogin: (credentials: Credentials) => Promise<void>;
}

const SigninForm = ({HandleLogin}: SigninFormProps) => {
    const form = useForm<Credentials>({
        resolver: zodResolver(userSchema), 
        defaultValues: {remember: false}
    });

    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch, 
        formState: { errors }
    } = form;

    const rememberValue = watch("remember", false);

    const onFormSubmit: SubmitHandler<Credentials> = (credentials:Credentials) => {
        HandleLogin(credentials);
    }

  return (
    <Form {...form}>
        <form className='flex flex-col space-y-4 ' onSubmit={handleSubmit(onFormSubmit)}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input { ...register("email") } type="email" id="email" placeholder="m@example.com" />
                {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input { ...register("password") }type="password" id="password" placeholder="Password" />
                {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
            </div>
            <div className="flex items-center">
                <Checkbox  checked={rememberValue} onCheckedChange={(checked) => setValue("remember", !!checked)} name='remember-me'/>
                <label htmlFor="remember-me" className='ml-2 text-zinc-200'>Remember Me</label>
            </div>
            <Button type="submit">Sign In</Button>
            <div>
                <p>Don't have an account? <NavLink to={"/signup"} className='font-bold'>Sign Up</NavLink></p>
            </div>
        </form>
    </Form>
  )
}

export default SigninForm