import { useQuery } from '@tanstack/react-query'
import React from 'react'
import SetDetailsTable from './SetDetailsTable'

type SetDetailsProps = {
    sessionExerciseID: number,
    exerciseSet: number,
}

const SetDetails: React.FC<SetDetailsProps> = ({sessionExerciseID, exerciseSet}) => {
    const {data: setHistory} = useQuery({
        queryKey: ['set'],
        queryFn: async () => {
            const response = await fetch(`/api/set/get?sessionExerciseID=${sessionExerciseID}&exerciseSet=${exerciseSet}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        }
    })

    console.log(setHistory);
 
  return (
    <div>
        <SetDetailsTable setHistory={setHistory} />
    </div>
  )
}

export default SetDetails