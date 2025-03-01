import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { z } from 'zod'

const userSchema = z.object({
    username: z.string().min(4, "Username must be at least 4 characters."),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters."),
})

type newUser = z.infer<typeof userSchema>

type SignupFormProps = {
    HandleSignup: (newUser: newUser) => Promise<void>;
}

const SignupForm = ({ HandleSignup }: SignupFormProps) => {
    
    const form = useForm<newUser>({
        resolver: zodResolver(userSchema)
    });

    const { 
        register, 
        handleSubmit, 
        formState: { errors }
    } = form;

    const onFormSubmit: SubmitHandler<newUser> = (newUser: newUser) => {
        HandleSignup(newUser);
    }
    
  return (
    <Form {...form}>
        <form className='flex flex-col space-y-4 ' onSubmit={handleSubmit(onFormSubmit)}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input { ...register("username") } type="username" id="username" placeholder="Username" name="username"/>
                {errors.username && <span className='text-red-500'>{errors.username.message}</span>}
            </div>
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
            <Button type="submit">Sign Up</Button>
            <div>
                <p>already have an account? <NavLink to={"/signin"} className='font-bold'>Sign In</NavLink></p>
            </div>
        </form>
    </Form>
  )
}

export default SignupForm