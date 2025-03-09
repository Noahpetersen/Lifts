import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react'
import Loading from './Loading';
import { Input } from '@/components/ui/input';

type SetData = {
    weight: number;
    reps: number;
}

type RegisterSetFormProps = {
    registerSetData: (setData: SetData) => void;
    sessionExerciseID: number;
    exerciseSet: number;
}

const RegisterSetForm: React.FC<RegisterSetFormProps> = ({registerSetData, sessionExerciseID, exerciseSet}) => {
    const {data: setHistory, isPending} = useQuery({
        queryKey: ['set', sessionExerciseID, exerciseSet],
        queryFn: async () => {
            const response = await fetch(`/api/set/get?sessionExerciseID=${sessionExerciseID}&exerciseSet=${exerciseSet}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        }
    })
    const lastWeight = setHistory && setHistory.length > 0 ? setHistory[0].weight : 0;
    const currentReps = setHistory && setHistory.length > 0 ? setHistory[0].reps : 0;
    
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [reps, setReps] = useState<number>(0);

    const repsTabFocus = useRef<HTMLButtonElement>(null);
    const weightTabFocus = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        if (setHistory && setHistory.length > 0) {
            setWeight(lastWeight);
            setReps(currentReps);
        }
    }, [setHistory]);

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove non-numeric characters and set the weight
        const value = e.target.value.replace(/[^0-9]/g, "");
        setWeight(Number(value));
    };

    const HandleNext = () => {

        if(tabIndex === 0) {
            setTabIndex(tabIndex + 1);
            repsTabFocus.current?.focus();
            return;
        }

        const set = {
            weight: weight,
            reps: reps
        }
        console.log(set)

        registerSetData(set)
        setTabIndex(0);
        weightTabFocus.current?.focus();
    }

    if(isPending) {
        return <Loading />
    }

  return (
    
    <Tabs defaultValue={'weight'} className="w-full mt-2 px-10 py-6 border-t-1 gap-0 absolute bottom-0 bg-background sticky">
        <TabsList className="flex w-full">
            <TabsTrigger ref={weightTabFocus} onFocus={() => setTabIndex(0)} value="weight" className=" ">Weight</TabsTrigger>
            <TabsTrigger ref={repsTabFocus} value="reps" className="">Reps</TabsTrigger>
        </TabsList>
        <TabsContent value="weight" className="w-full">
            <div className='my-8'>
            <div className="flex items-center">
            <Input
                type="text"
                className="text-center text-4xl font-bold mb-5 
                        border-none outline-none focus:ring-0 focus:outline-none 
                        focus-visible:ring-0 focus-visible:outline-none bg-transparent"
                value={`${weight} KG`}
                onFocus={(e) => e.target.select()} 
                onChange={handleWeightChange}
            />
        </div>
                <Slider defaultValue={[weight]} onValueChange={(value) => setWeight(value[0])}  min={0} max={100} step={5}/>
            </div>
            <Button onClick={HandleNext} className='mx-auto block w-full'>Next</Button>
        </TabsContent>
        <TabsContent value="reps" className="w-full">
            <div className='my-8'>
                <Input 
                    type='number' 
                    className='text-center text-4xl font-bold mb-5 
                        border-none outline-none focus:ring-0 focus:outline-none 
                        focus-visible:ring-0 focus-visible:outline-none bg-transparent' 
                    value={reps}
                    onFocus={(e) => e.target.select()} 
                    onChange={(e)  => {setReps(Number(e.target.value))}}/>
                <Slider defaultValue={[reps]} onValueChange={(value) => {setReps(value[0])}}  min={1} max={20} step={1}/>
            </div>
            <Button onClick={HandleNext} className='mx-auto block w-full'>Next</Button>
        </TabsContent>
    </Tabs>
  )
}


export default RegisterSetForm