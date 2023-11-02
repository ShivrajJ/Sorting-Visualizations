import {useEffect, useState} from 'react'
import './Sort.css'

interface SortFunction {
    sortName: string;
    resetArr: () => void;
    sortFunc: (arr:Array<number>, setArray: React.Dispatch<React.SetStateAction<number[]>>, setActive: React.Dispatch<React.SetStateAction<number>>, iteration:number, setIteration:React.Dispatch<React.SetStateAction<number>>) => Promise<Array<number>>
}

export default function Sort({sortName, resetArr, sortFunc} : SortFunction) {
    const [array, setArray] = useState<Array<number>>(Array.from({length:100}, () => Math.floor(Math.random()*100)));
    const [active, setActive] = useState<number>(0);
    const [sortStart, setSortStart] = useState<boolean>(false);
    const [iteration, setIteration] = useState<number>(0);
    function startSort() : void {
        if(!sortStart) {
            setSortStart(true);
            setIteration(0);
            sortFunc([...array], setArray, setActive, iteration, setIteration).then(() => {
                setSortStart(false);
            });
        }
    }
    useEffect(()=> {
        console.log("update");
    }, [array])
    return (
        <>  
            <h1>{sortName}</h1>
            <button onClick={startSort}>Begin</button>
            <button onClick={() => {
                if(sortStart) {
                    resetArr();
                } else {
                    setArray(Array.from({length:100}, () => Math.floor(Math.random()*100)));
                    setIteration(0);
                }
            }}>Reset</button>
            <p>Iterations: {iteration}</p>
            <div className='sort-div'>
                {array.map((num, idx) => {
                    return(
                        <span className={`sort-bar ${idx==active?'active-sort-bar':''}`} style={{height:num*5}}></span>
                    ) 
                })}
            </div>
        </>
    )
}