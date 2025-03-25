import * as React from 'react';
import useSWR from 'swr';

export interface StudentDetailProps {
    studentId: string 
}

const timeRequest = 60 * 60 * 1000

export function StudentDetail ({studentId}: StudentDetailProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {data, error, mutate, isValidating} = useSWR(`/students/${studentId}`,
    {
        revalidateOnFocus: false,
        dedupingInterval: timeRequest,

    }
  )
  function handleMutateClick () {
    mutate({ name: 'ngo anh'}, true)
  }
    return <div> name: {data?.name || '--'} <button onClick={handleMutateClick} >mutate</button> </div>
  
}
