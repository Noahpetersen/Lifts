import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Exercise } from '../types/exercises'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Combobox } from '@/components/ui/Combobox';
import Close from '@/components/icons/Close';
import { useQuery } from '@tanstack/react-query';



type AddExercisesProps = {
    exercises: Exercise[];
    setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
};

const AddExercises: React.FC<AddExercisesProps> = ({exercises, setExercises}) => {
    const [isAddingElement, setIsAddingElement] = useState<boolean>(true);
    const [comboBoxValue, setComboBoxValue] = useState<string>("");
    const [comboboxData, setComboboxData] = useState<{label: string, value: string}[]>([])

    const { data: fetchedExercises = [], isLoading } = useQuery<Exercise[]>({
        queryKey: ['exercises'],
        queryFn: async () => {
          const res = await fetch('/api/exercises/get');
          return await res.json();
        },
    });
    
    useEffect(() => {
        if (!fetchedExercises.length) return;
        console.log(fetchedExercises)  
    
        setComboboxData(
            fetchedExercises
                .filter((exercise) => exercise) 
                .map((exercise) => ({
                    label: exercise.name as string,
                    value: exercise.name as string,
                }))
        );
    }, [fetchedExercises]);

    const exerciseNameRef = useRef<HTMLInputElement>(null)
    const exerciseSetsRef = useRef<HTMLInputElement>(null)

    const HandleNewExercise = () => {
        let exercise: Exercise = {name: "", sets: 0}

        if(isAddingElement) {
            exercise = {
                name: exerciseNameRef.current?.value,
                sets: Number(exerciseSetsRef.current?.value)
            }
        }
        else {
            exercise = {
                name: comboBoxValue,
                sets: Number(exerciseSetsRef.current?.value)
            }
        }
        console.log(comboBoxValue)
        

        setExercises([...exercises, exercise])
    }

    const HandleRemoveExercise = (index: number) => {
        const newExercises = exercises.filter((_, i) => i !== index)
        setExercises(newExercises)
    }

    useEffect(() => {
        if(comboBoxValue === "Add") {
            setIsAddingElement(true)
            
        } else {
            setIsAddingElement(false)
        }
    }, [comboBoxValue])


  return (
    <div>
        <Label className='mb-2'>Add Exercises</Label>
        <div className='flex gap-2'>
            {isAddingElement && 
                <div className="relative flex items-center w-full">
                <Input
                  ref={exerciseNameRef}
                  type="text"
                  placeholder="New Exercise"
                  className="pr-10" 
                />
                <Close
                  className="absolute right-3 w-5 h-5"
                  onClick={() => {
                    setIsAddingElement(false);
                    setComboBoxValue("");
                  }}/>
              </div>
            }
            {!isAddingElement && <Combobox type="Exercise" data={comboboxData} onChange={(value) => setComboBoxValue(value)}/>}
            <Input ref={exerciseSetsRef} type="number" className='w-30' placeholder='Sets'/>
            <Button onClick={HandleNewExercise}>Add</Button>
        </div>

        <Card className='mt-4 px-4 overflow-y-scroll h-100'>
            <Table>
                <TableHeader>
                    <TableHead className="w-[80%]">Exercise</TableHead>
                    <TableHead className='text-right'>Sets</TableHead>
                    <TableHead></TableHead>
                </TableHeader>
                <TableBody>
                    {exercises.map((exercise, index) => (
                        <TableRow key={index}>
                            <TableCell>{exercise.name}</TableCell>
                            <TableCell className='text-right'>{exercise.sets}</TableCell>
                            <TableCell><Close onClick={() => HandleRemoveExercise(index)} className='w-3 h-3'/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    </div>
  )
}

export default AddExercises