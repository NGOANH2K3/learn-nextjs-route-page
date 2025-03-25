import { StudentDetail } from '@/components/SWR';
import  React, { useState } from 'react';



export default function SWRPage () {
    const [detailList, setDetailList] = useState ([1,1,1])

    function handleAddClick() {
        setDetailList(prevList => [...prevList,1])
    }
  return (
    <div>
      <h1> SWR Playroad </h1>
      <button onClick={handleAddClick}>Add detail</button>
      <ul>
        {detailList.map((x, index)=>(
        <li key={index}>
            <StudentDetail studentId='aqbbx1vj1lqrtv3y0'/>
        </li>
        ))}
      </ul>
    </div>
  );
}
