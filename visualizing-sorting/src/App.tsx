import Sort from './components/Sort'
import './App.css'
import { useEffect, useState } from 'react';

function swap(arr:Array<number>, a:number, b:number):void {
  var temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
const timer = (ms:number) => new Promise(res => setTimeout(res, ms))
const reset = {value:false};
function resetArr() : void {
  reset.value = true;
}

function App() {
  const [array, setArray] = useState<Array<number>>(Array.from({length:100}, () => Math.floor(Math.random()*100)));
  const [maxInt, setMaxInt] = useState(100);
  //#region SORT FUNCTIONS
  async function bubbleSort(arr : Array<number>, setArr: React.Dispatch<React.SetStateAction<number[]>>, setActive: React.Dispatch<React.SetStateAction<number>>, iteration:number, setIteration: React.Dispatch<React.SetStateAction<number>>): Promise<Array<number>> {
    var flag:boolean = true;
    while(flag) {
      flag = false;
      for (let i : number = 0; i < arr.length - 1; i++) {
        setIteration(iteration++);
        if(reset.value) {
          break;
        }
        if(arr[i] < arr[i+1]) {
          swap(arr, i, i+1);
          setActive(i);
          flag = true;
          await timer(20);
          setArr([...arr]);
        }
      }
    }
    setActive(-1);
    if(reset.value) {
      // setArr(Array.from({length:100}, () => Math.floor(Math.random()*100)));
      setArr(array);
      setIteration(0);
      reset.value = false;
    }
    return arr;
  }
  async function selectionSort(arr : Array<number>, setArr: React.Dispatch<React.SetStateAction<number[]>>, setActive: React.Dispatch<React.SetStateAction<number>>, iteration:number, setIteration: React.Dispatch<React.SetStateAction<number>>): Promise<Array<number>> {
    for(let i : number = 0; i<arr.length-1; i++) {
      var biggest:number = i;
      for(let j = i+1; j < arr.length; j++) {
        setIteration(iteration++);
        if(reset.value) {
          break;
        }
        if(arr[j] > arr[biggest]) {
          biggest = j;
          await timer(20);
        }
      }
      setActive(biggest);
      swap(arr, i, biggest);
      // await timer(20);
      setArr([...arr]);
    }
    setActive(-1);
    if(reset.value) {
      // setArr(Array.from({length:100}, () => Math.floor(Math.random()*100)));
      setArr(array);
      setIteration(0);
      reset.value = false;
    }
    return arr;
  }
  async function insertionSort(arr:Array<number>, setArr: React.Dispatch<React.SetStateAction<number[]>>, setActive: React.Dispatch<React.SetStateAction<number>>, iteration:number, setIteration: React.Dispatch<React.SetStateAction<number>>): Promise<Array<number>> {
    for(let i:number = 1; i < arr.length; i++) {
      var temp:number = i;
      while(temp>0 && arr[temp] > arr[temp-1]) {
        if(reset.value) {
          break;
        }
        setIteration(iteration++);
        swap(arr, temp, temp-1);
        setActive(temp)
        temp--;
        await timer(20);
        setArr([...arr]);
      }
    }
    setActive(-1);
    if(reset.value) {
      // setArr(Array.from({length:100}, () => Math.floor(Math.random()*100)));
      setArr(array);
      setIteration(0);
      reset.value = false;
    }
    return arr;
  }
  async function mergeSort(arr : Array<number>, setArr: React.Dispatch<React.SetStateAction<number[]>>, setActive: React.Dispatch<React.SetStateAction<number>>, iteration:number, setIteration: React.Dispatch<React.SetStateAction<number>>): Promise<Array<number>> {
    async function merge(arr:Array<number>, l:number, mid:number, r:number): Promise<void> {
      var n1:number = mid-l+1;
      var n2:number = r-mid;
      
      var lArr:Array<number> = arr.slice(l, mid+1);
      var rArr:Array<number> = arr.slice(mid+1, r+1);

      let i:number = 0;
      let j:number = 0;
      let k:number = l;
      while(i<n1 && j<n2) {
        if(reset.value) {
          break;
        }
        if(lArr[i] >= rArr[j]) {
          arr[k] = lArr[i];
          setIteration(iteration++);
          await timer(20);
          setArr([...arr]);
          i++;
        } else {
          arr[k] = rArr[j];
          setIteration(iteration++);
          await timer(20);
          setArr([...arr]);
          j++;
        }
        k++;
      }
      while(i<n1) {
        if(reset.value) {
          break;
        }
        arr[k] = lArr[i];
        setIteration(iteration++);
        await timer(20);
        setArr([...arr]);
        i++;
        k++;
      }
      while(j<n2) {
        if(reset.value) {
          break;
        }
        arr[k] = rArr[j];
        setIteration(iteration++);
        await timer(20);
        setArr([...arr]);
        j++;
        k++;
      }
    }
    async function mSort(arr:Array<number>, l:number, r:number): Promise<void> {
      if(reset.value) {
        return;
      }
      if(l>=r) {
        return;
      }
      var mid:number = Math.floor((l+r) / 2);
      await mSort(arr, l, mid);
      await mSort(arr, mid+1, r);
      setActive(mid);
      await merge(arr, l, mid, r);
    }
    await mSort(arr, 0, arr.length-1);
    setActive(-1);
    if(reset.value) {
      // setArr(Array.from({length:100}, () => Math.floor(Math.random()*100)));
      setArr(array);
      setIteration(0);
      reset.value = false;
    }
    return arr;
  }
  async function quickSort(arr : Array<number>, setArr: React.Dispatch<React.SetStateAction<number[]>>, setActive: React.Dispatch<React.SetStateAction<number>>, iteration:number, setIteration: React.Dispatch<React.SetStateAction<number>>): Promise<Array<number>> {
    async function partition(arr:Array<number>, low:number, high:number): Promise<number> {
      var pivot = arr[low];
      setActive(low);
      var j:number = high;
      for(var i = high; i > low; i--) {
        if(reset.value) {
          break;
        }
        if(arr[i] < pivot) {
          swap(arr, i, j);
          setIteration(iteration++);
          await timer(20);
          setArr([...arr]);
          j--;
        }
      }
      swap(arr, low, j);
      setActive(j);
      setIteration(iteration++);
      await timer(20);
      setArr([...arr]);
      return j;
    }
    async function qSort(arr:Array<number>, low:number, high:number): Promise<void> {
      if(reset.value) {
        return;
      }
      if(low < high) {
        var p:number = await partition(arr, low, high);
        await qSort(arr, low, p-1);
        await qSort(arr, p+1, high);
      }
    }
    await qSort(arr, 0, arr.length-1);
    setActive(-1);
    if(reset.value) {
      // setArr(Array.from({length:100}, () => Math.floor(Math.random()*100)));
      setArr(array);
      setIteration(0);
      reset.value = false;
    }
    return arr;
  }
  //#endregion SORT FUNCTIONS
  
  function updateArray() {
    var input:HTMLInputElement|null = (document.getElementById('array-input') as HTMLInputElement);
    if(input!=null) {
      var arr:number[]|undefined = input.value?.replace(" ", "").split(",").map(Number);

      if(arr!=undefined) {
        setArray(arr);
        setMaxInt(Math.max(...arr));
      }
    }
  }

  function random100() {
    setArray(Array.from({length:100}, () => Math.floor(Math.random()*100)));
    setMaxInt(100);
    resetArr();
  }

  useEffect(() => {
    console.log("Array updated!");
    console.log(array);
  }, [array]);

  return (
    <>
      <div className='heading-div'>
        <h1>Sorting Visualization</h1>
        <div>Custom Array: <input type="text" onInput={updateArray} id="array-input"/></div>
        <button onClick={random100}>Set Random 100</button>
      </div>
      <Sort sortName={"Bubble Sort"} arr={array} maxInt={maxInt} resetArr={resetArr} sortFunc={bubbleSort} />
      <Sort sortName={"Selection Sort"} arr={array} maxInt={maxInt} resetArr={resetArr} sortFunc={selectionSort} />
      <Sort sortName={"Insertion Sort"} arr={array} maxInt={maxInt} resetArr={resetArr} sortFunc={insertionSort} />
      <Sort sortName={"Merge Sort"} arr={array} maxInt={maxInt} resetArr={resetArr} sortFunc={mergeSort} />
      <Sort sortName={"Quick Sort"} arr={array} maxInt={maxInt} resetArr={resetArr} sortFunc={quickSort} />
    </>
  )
}

export default App
