import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useEffect, useState } from 'react'

type SetHistory = {
    createdAt: string,
    weight: number,
    reps: number,
    isRepsHigherThanPrevious?: boolean | null,
    isWeightHigherThanPrevious?: boolean | null,
}

type SetDetailsTableProps = {
    setHistory: SetHistory[]
};


const SetDetailsTable: React.FC<SetDetailsTableProps> = ({setHistory = []}) => {
    const [setTableData, setSetTableData] = useState<SetHistory[]>([]);

    useEffect(() => {
        if (!setHistory || setHistory.length === 0) return;
    
        const reversedSetHistory = setHistory.slice().reverse();
    
        const newSetTableData = reversedSetHistory.map((set, index) => {
            const previousSet = reversedSetHistory[index - 1]; 
    
            if (previousSet) {
                const setWeight = Math.round(set.weight * 100) / 100;
                const previousSetWeight = Math.round(previousSet.weight * 100) / 100;

                const previousSetHasSameWeight = previousSetWeight === setWeight;
                const previousSetHasMoreRepsOnSameWeight = previousSetHasSameWeight ? previousSet.reps < set.reps : null;
                
                return {
                    ...set,
                    isRepsHigherThanPrevious: previousSetHasMoreRepsOnSameWeight,
                    isWeightHigherThanPrevious: previousSetHasSameWeight ? null : setWeight > previousSetWeight
                };
            }
    
            return set;
        });
    
        setSetTableData(newSetTableData.reverse());
    }, [setHistory]);

    const getRepsIndicator = (isRepsHigherThanPrevious: boolean | null | undefined) => {
        if (isRepsHigherThanPrevious === null) return null;
        const isUpward = isRepsHigherThanPrevious;
    
        return (
            <svg 
                className="w-2.5 h-2.5" 
                width="10" 
                height="10" 
                viewBox="0 0 6 6" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M0.749899 4.75H5.2499C5.29546 4.74985 5.34012 4.73729 5.37907 4.71365C5.41802 4.69002 5.44979 4.6562 5.47095 4.61586C5.49211 4.57551 5.50187 4.53016 5.49918 4.48467C5.49648 4.43919 5.48143 4.39531 5.45565 4.35775L3.20565 1.10775C3.1124 0.972996 2.8879 0.972996 2.7944 1.10775L0.544399 4.35775C0.518356 4.39523 0.503083 4.43914 0.500241 4.48469C0.497398 4.53025 0.507095 4.57572 0.528278 4.61615C0.54946 4.65658 0.581318 4.69043 0.62039 4.71403C0.659462 4.73763 0.704254 4.75007 0.749899 4.75Z"
                    fill={isUpward ? "#13A100" : "#E10000"}
                    transform={isUpward ? "" : "scale(1, -1) translate(0, -6)"} 
                />
            </svg>
        );
    };
    


  return (
        <Card className='p-2'>
            <Table>
                <TableCaption>Reps are only compared to entrys of same weight.</TableCaption>
                <TableHeader>
                    <TableHead className="">Date</TableHead>
                    <TableHead >Weight</TableHead>
                    <TableHead className='text-right'>Reps</TableHead>
                </TableHeader>
                <TableBody>
                    {setTableData && setTableData.map((set, index) => (
                        console.log(set),
                        <TableRow key={index}>
                            <TableCell>{set.createdAt}</TableCell>

                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <p>{set.weight}</p>
                                    {getRepsIndicator(set.isWeightHigherThanPrevious)}
                                </div>
                            </TableCell>

                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <p>{set.reps}</p>
                                    {getRepsIndicator(set.isRepsHigherThanPrevious)}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))} 
                </TableBody>
            </Table>
        </Card>
  )
}

export default SetDetailsTable