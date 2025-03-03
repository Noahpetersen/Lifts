import { Badge } from '@/components/ui/badge';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label';
import React from 'react'

type SessionListItemProps = {
  key: number;
  sessionName: string;
  numberOfExercises: number;
};

const SessionListItem: React.FC<SessionListItemProps> = ({ key, sessionName, numberOfExercises }) => {

  return (
    <li key={key}>
      <Card className='py-5  flex flex-col gap-15 cursor-pointer'>
        <CardHeader>
          <Label>{sessionName}</Label>
          <CardTitle className='text-3xl'>{numberOfExercises} Exercises</CardTitle>
        </CardHeader>
        <CardFooter>
          <Badge>
            <div className='flex items-center gap-2'>
              <p className='font-bold'>Start Session</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z"/></svg>
            </div>
          </Badge>
        </CardFooter>
      </Card>
    </li>
  )
}

export default SessionListItem