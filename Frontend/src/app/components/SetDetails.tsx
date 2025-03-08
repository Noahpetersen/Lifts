import { useQuery } from '@tanstack/react-query'
import React from 'react'
import SetDetailsTable from './SetDetailsTable'
import SetDetailsChart from './SetDetailsChart'

type SetDetailsProps = {
    sessionExerciseID: number,
    exerciseSet: number,
}

const SetDetails: React.FC<SetDetailsProps> = ({sessionExerciseID, exerciseSet}) => {
    const {data: setHistory, isFetched} = useQuery({
        queryKey: ['set'],
        queryFn: async () => {
            const response = await fetch(`/api/set/get?sessionExerciseID=${sessionExerciseID}&exerciseSet=${exerciseSet}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        }
    })
    
    if (!isFetched) {
        return <div>Loading...</div>
    }

  return (
    <div className='flex flex-col gap-2'>
        <SetDetailsChart chartData={setHistory}/>
        <SetDetailsTable setHistory={setHistory} />
    </div>
  )
}

export default SetDetails