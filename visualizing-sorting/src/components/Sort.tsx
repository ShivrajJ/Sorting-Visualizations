import {useEffect, useState} from 'react'
import './Sort.css'

interface SortFunction {
    sortName: string;
    arr: number[];
    maxInt: number;
    resetArr: () => void;
    sortFunc: (arr:Array<number>, setArray: React.Dispatch<React.SetStateAction<number[]>>, setActive: React.Dispatch<React.SetStateAction<number>>, iteration:number, setIteration:React.Dispatch<React.SetStateAction<number>>) => Promise<Array<number>>
}

export default function Sort({sortName, arr, maxInt, resetArr, sortFunc} : SortFunction) {
    const [array, setArray] = useState<Array<number>>((arr.length == 0) ? Array.from({length:100}, () => Math.floor(Math.random()*100)) : arr);
    // const [greatestNum, setGreatestNum]
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
        setIteration(0);
        maxInt = Math.max(...arr);
        console.log(maxInt);
        setArray(arr);
    }, [arr])
    useEffect(()=> {
        console.log("update");
    }, [array])
    return (
        <>  
            <h2>{sortName}</h2>
            <button onClick={startSort}>Begin</button>
            <button onClick={() => {
                if(sortStart) {
                    resetArr();
                } else {
                    // setArray(Array.from({length:100}, () => Math.floor(Math.random()*100)));
                    setArray(arr);
                    setIteration(0);
                }
            }}>Reset</button>
            <p>Iterations: {iteration}</p>
            <div className='sort-div'>
                {array.map((num, idx) => {
                    console.log(num);
                    console.log(maxInt);
                    console.log(num/maxInt);
                    return(
                        <span className={`sort-bar ${idx==active?'active-sort-bar':''}`} style={{height:(num/maxInt)*500, width:screen.width / arr.length}}></span>
                    ) 
                })}
            </div>
        </>
    )
}