import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { register } from 'module'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type SetData = {
    weight: number;
    reps: number;
}

type RegisterSetFormProps = {
    exercise: {name: string, currentSet: number},
    registerSetData: (setData: SetData) => void;
}

const setSchema = z.object({
    weight: z.number().min(1, "Please enter a weight"),
    reps: z.number().min(1, "Please enter the number of reps")
})

type RegisterSetFormValues = z.infer<typeof setSchema>

const RegisterSetForm: React.FC<RegisterSetFormProps> = ({exercise, registerSetData}) => {
    const form = useForm<RegisterSetFormValues>({
        resolver: zodResolver(setSchema),
        defaultValues: {weight: 0, reps: 0}
    });

    const { handleSubmit, register, formState: {errors}
     } = form;

    const HandleSetSubmission: SubmitHandler<RegisterSetFormValues> = (values: RegisterSetFormValues) => {
        const set = {
            weight: values.weight,
            reps: values.reps,
        }

        registerSetData(set)

        form.setValue("weight", 0)
        form.setValue("reps", 0)
    }

    useEffect(() => {
        if(errors.weight) {
            toast(errors.weight.message)
        }
        if(errors.reps) {
            toast(errors.reps.message)
        }
    }, [errors])

  return (
    <>
        <div className='flex items-center mb-4'>
            <h2 className='text-2xl font-bold'>{exercise.name}</h2>
            <p className='ml-auto'>Set {exercise.currentSet}</p>
        </div>
        <Form {...form} >
            <form className='mx-auto mt-20' onSubmit={handleSubmit(HandleSetSubmission)}>
                <div className='flex items-center gap-5'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="weight">Weight</Label>
                        <Input {...register("weight", {valueAsNumber: true})} type="number" id='weight' name='weight' className='input h-15 w-25' />
                    </div>
                    <p className='text-4xl'>-</p>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="reps">Reps</Label>
                        <Input {...register("reps", {valueAsNumber: true})} type="number" id='reps' name='reps' className='input h-15 w-25' />
                    </div>
                    
                </div>
                <Button type="submit" className='mt-4 h-12 text-lg w-full'>Next</Button>
            </form>
        </Form>
    </>
  )
}

export default RegisterSetForm