import React from 'react'

type CurrentDateProps = {
    className: string;
}

const CurrentDate: React.FC<CurrentDateProps> = ({className}) => {
    const date = new Date();

const weekday = date.toLocaleString('en-GB', { weekday: 'long' });
const day = date.getDate();
const month = date.toLocaleString('en-GB', { month: 'long' });

  return (
    <div className={`flex gap-2 font-bold text-lg ${className}`}>
        <p className='text-zinc-400'>{weekday}</p>
        <p className='text-primary'>{day}</p>
        <p className='text-primary'>{month}</p>
    </div>
  )
}

export default CurrentDate