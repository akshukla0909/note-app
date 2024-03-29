import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

const App = () => {

  const [first, setfirst] = useState('')
  const [id, setid] = useState('')
  const [show, setshow] = useState(false)

  const [val, setval] = useState([])

  useEffect(() => {
     const getData = async ()=>{
        const dbVal =  await getDocs(value);
        setval(dbVal.docs.map(doc=>({...doc.data(), id : doc.id})))
     }
     getData();
  }, [val])
  


  const value = collection(db, "demo");

  const handleSubmit = async ()=>{
    await addDoc(value, { name1 : first , })
    setfirst("")
  }

  const handleDelete = async (id)=>{
    const deleteVal =  doc(db, "demo", id)
    await  deleteDoc(deleteVal)
  }

  const handleUpdate = (name,id)=>{
    console.log(id,name);
    setfirst(name)
    setid(id)
    setshow(prev => !prev)
    // setid()
  }

  const handleEdit = async ()=>{
    const updata = doc(db, "demo", id)
    await updateDoc(updata, {name1 : first})
    setfirst("")
    setshow(prev => !prev)

  }

  const [data, setData] = useState('');
  const handleSearch = (e)=>{
    const inp = e.target.value
    setData(inp)
    console.log(data);
    console.log(val);
  // const filtered = val.filter(elem => elem.name1.toLowerCase().includes(inp.toLowerCase()))
  // console.log(filtered);

}

  const filtered = val.filter(elem => elem.name1.toLowerCase().includes(data.toLowerCase()))
  
  

  return (
    <div>
         <div class="header fixed bg-[#AE7FEB] h-16 w-full flex items-center justify-center">
        <input type="text" 
        value={data}
        onChange={handleSearch}
       placeholder="search here" 
      className="w-96 h-8 outline-none rounded-md px-2" />
       </div>

       <div className='absolute text top-20 left-[20%] w-1/2'>
       
       <div class="flex items-center border-b-2 border-[#af7eeb] py-2">
            <input
                value={first}
                onChange={e => setfirst(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text" placeholder="Add a note" />

                {!show ? (
                   <button
                   onClick={handleSubmit}
                   className="flex-shrink-0 bg-[#AF7EEB] text-sm  text-white py-2 px-4 rounded"
                   type="button">
                   Add
               </button>
                ) : (
                <button
                  onClick={handleEdit}
                  className="flex-shrink-0 bg-[#AF7EEB] text-sm  text-white py-2 px-4 rounded"
                  type="button">
                  Update
              </button>)}
         
        </div>


        { filtered.length > 0 ? 
          filtered.map((values, id)=>( <div key={id} className='py-2 flex items-center w-full gap-2' >
            <h1 className='w-full h-24 shadow-lg rounded-md px-4 py-6 truncate' >{values.name1}</h1>
            <div className='flex flex-col gap-2 items-center justify-between '>
            <button onClick={()=> handleDelete(values.id)} className='bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center
            '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
             <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
            </button>

            {/* update button */}
           <button className='bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center'
           onClick={()=> handleUpdate(values.name1, values.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
</button>
            </div>

          </div> ))
         : <div>
          <h1 className='font-semibold m-2 text-xl'>No notes found</h1>
         </div> } 

       </div>
    </div>
  )
}

export default App
