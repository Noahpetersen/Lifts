import React from 'react';
import { cn } from '@/lib/utils'

const Loading = () => {
  return (
    <div className="flex items-center space-x-2 h-dvh justify-center">
        <div className={cn("w-2.5 h-2.5 rounded-full bg-neutral-800 animate-bounce")}></div>
        <div className={cn("w-2.5 h-2.5 rounded-full bg-neutral-800 animate-bounce200")}></div>
        <div className={cn("w-2.5 h-2.5 rounded-full bg-neutral-800 animate-bounce400")}></div>
    </div>
  )
}

export default Loading