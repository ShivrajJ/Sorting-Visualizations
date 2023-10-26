import Sort from './components/Sort'
import './App.css'

function swap(arr:Array<number>, a:number, b:number):void {
  var temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
const timer = (ms:number) => new Promise(res => setTimeout(res, ms))

async function bubbleSort(arr : Array<number>, setArr: React.Dispatch<React.SetStateAction<number[]>>, setActive: React.Dispatch<React.SetStateAction<number>>): Promise<Array<number>> {
  var flag:boolean = true;
  while(flag) {
    flag = false;
    for (let i : number = 0; i < arr.length - 1; i++) {
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
  return arr;
}

async function selectionSort(arr : Array<number>, setArr: React.Dispatch<React.SetStateAction<number[]>>, setActive: React.Dispatch<React.SetStateAction<number>>): Promise<Array<number>> {
  for(let i : number = 0; i<arr.length-1; i++) {
    var biggest:number = i;
    for(let j = i+1; j < arr.length; j++) {
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
  return arr;
}
async function insertionSort(arr:Array<number>, setArr: React.Dispatch<React.SetStateAction<number[]>>, setActive: React.Dispatch<React.SetStateAction<number>>): Promise<Array<number>> {
  for(let i:number = 1; i < arr.length; i++) {
    var temp:number = i;
    while(temp>0 && arr[temp] > arr[temp-1]) {
      swap(arr, temp, temp-1);
      setActive(temp)
      temp--;
      await timer(20);
      setArr([...arr]);
    }
  }
  setActive(-1);
  return arr;
}
async function mergeSort(arr : Array<number>, setArr: React.Dispatch<React.SetStateAction<number[]>>, setActive: React.Dispatch<React.SetStateAction<number>>): Promise<Array<number>> {
  async function merge(arr:Array<number>, l:number, mid:number, r:number): Promise<void> {
    var n1:number = mid-l+1;
    var n2:number = r-mid;
    
    var lArr:Array<number> = arr.slice(l, mid+1);
    var rArr:Array<number> = arr.slice(mid+1, r+1);

    let i:number = 0;
    let j:number = 0;
    let k:number = l;
    while(i<n1 && j<n2) {
      if(lArr[i] >= rArr[j]) {
        arr[k] = lArr[i];
        await timer(20);
        setArr([...arr]);
        i++;
      } else {
        arr[k] = rArr[j];
        await timer(20);
        setArr([...arr]);
        j++;
      }
      k++;
    }
    while(i<n1) {
      arr[k] = lArr[i];
      await timer(20);
      setArr([...arr]);
      i++;
      k++;
    }
    while(j<n2) {
      arr[k] = rArr[j];
      await timer(20);
      setArr([...arr]);
      j++;
      k++;
    }
  }
  async function mSort(arr:Array<number>, l:number, r:number): Promise<void> {
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
  return arr;
}
async function quickSort(arr : Array<number>, setArr: React.Dispatch<React.SetStateAction<number[]>>, setActive: React.Dispatch<React.SetStateAction<number>>): Promise<Array<number>> {
  async function partition(arr:Array<number>, low:number, high:number): Promise<number> {
    var pivot = arr[low];
    setActive(low);
    var j:number = high;
    for(var i = high; i > low; i--) {
      if(arr[i] < pivot) {
        swap(arr, i, j);
        await timer(20);
        setArr([...arr]);
        j--;
      }
    }
    swap(arr, low, j);
    setActive(j);
    await timer(20);
    setArr([...arr]);
    return j;
  }
  async function qSort(arr:Array<number>, low:number, high:number): Promise<void> {
    if(low < high) {
      var p:number = await partition(arr, low, high);
      await qSort(arr, low, p-1);
      await qSort(arr, p+1, high);
    }
  }
  await qSort(arr, 0, arr.length-1);
  setActive(-1);
  return arr;
}

function App() {

  return (
    <>
      <Sort sortName={"Bubble Sort"} sortFunc={bubbleSort} />
      <Sort sortName={"Selection Sort"} sortFunc={selectionSort} />
      <Sort sortName={"Insertion Sort"} sortFunc={insertionSort} />
      <Sort sortName={"Merge Sort"} sortFunc={mergeSort} />
      <Sort sortName={"Quick Sort"} sortFunc={quickSort} />
    </>
  )
}

export default App
