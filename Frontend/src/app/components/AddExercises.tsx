import React, { useRef, useState } from 'react'
import { Exercise } from '../types/exercises'



type AddExercisesProps = {
    exercises: Exercise[];
    setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
};

const AddExercises: React.FC<AddExercisesProps> = ({exercises, setExercises}) => {
    //const [exercises, setExercises] = useState<Exercise[]>([])

    const exerciseNameRef = useRef<HTMLInputElement>(null)
    const exerciseSetsRef = useRef<HTMLInputElement>(null)

    const HandleNewExercise = () => {
        const exercise = {
            name: exerciseNameRef.current?.value,
            sets: Number(exerciseSetsRef.current?.value)
        }

        setExercises([...exercises, exercise])
    }

  return (
    <div>
        <h1>Exercises</h1>
        <div className='flex gap-2'>
            <input ref={exerciseNameRef} type="text" className='bg-white placeholder:text-zinc-700 text-zinc-900' placeholder='Exercise'/>
            <input ref={exerciseSetsRef} type="number" className='bg-white placeholder:text-zinc-700 text-zinc-700 text-base w-[7ch] px-2 py-1 border border-gray-300 rounded' placeholder='Sets'/>
            <button className='bg-sky-700 p-2 rounded-2xl' onClick={HandleNewExercise}>Add</button>
        </div>

        <ul>
            {exercises.map((exercise, index) => (
                <li key={index}>{exercise.name} - {exercise.sets}</li>
            ))}
        </ul>
    </div>
  )
}

export default AddExercises