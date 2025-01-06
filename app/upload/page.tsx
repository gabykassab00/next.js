"use client";
import React, {  useState } from 'react'


const Upload = () => {
    const [file,setfile] = useState(null);
    const [status,setstatus] = useState('')

    const onfilechange = (e:any)=>{
        setfile(e.target.files[0]);
    }

    const uploadfile = async ()=>{
        if(!file){
            alert('please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('file',file)

    }

    try{
        const response = await fetch('http://127.0.0.1:8000/api/upload',{
            method:'POST',
            body:FormData,
        })
        const result = await response.json();

        if (response.ok){
            setstatus(result.message || 'file uploaded successfully');
        }

    }



  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-6 rounded shadow w-80'>
            <h1 className='text-lg font-bold mb-4'>
                Upload File
            </h1>
            <input 
            type='file'
            onChange={onfilechange}
            className='border p-2 mb-4 w-full'/>
            <button onClick={uploadfile} className='bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600'>
                Upload
            </button>
            {status && <p className='mt-4 text-sm'>{status}</p>}
        </div>
      
    </div>
  )
}

export default Upload
