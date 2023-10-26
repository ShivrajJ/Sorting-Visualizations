import {useEffect, useState} from 'react'
import './Sort.css'

interface SortFunction {
    sortName: string;
    sortFunc: (arr:Array<number>, setArray: React.Dispatch<React.SetStateAction<number[]>>) => Promise<Array<number>>
}

export default function Sort({sortName, sortFunc} : SortFunction) {
    const [array, setArray] = useState<Array<number>>(Array.from({length:100}, () => Math.floor(Math.random()*100)));
    function resetArr() : void {
        setArray(Array.from({length:100}, () => Math.floor(Math.random()*100)));
    }
    function startSort() : void {
        sortFunc([...array], setArray);
    }
    useEffect(()=> {
        console.log("update");
    }, [array])
    return (
        <>  
            <h1>{sortName}</h1>
            <button onClick={startSort}>Begin</button>
            <button onClick={resetArr}>Reset</button>
            <div className='sort-div'>
                {array.map((num) => {
                    return(
                        <span className='sort-bar' style={{height:num*5}}></span>
                    ) 
                })}
            </div>
        </>
    )
}