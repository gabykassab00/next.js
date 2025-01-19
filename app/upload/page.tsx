"use client";
import { useRouter } from 'next/navigation';
import React, {  useState } from 'react'


const Upload = () => {
    const [file,setfile] = useState(null);
    const [status,setstatus] = useState('')
    const router = useRouter();
    const onfilechange = (e:any)=>{
        setfile(e.target.files[0]);
    }

    const uploadfile = async ()=>{
        if(!file){
            return;
        }

        const formData = new FormData();
        formData.append('file',file)

        
        try{
            const response = await fetch('http://127.0.0.1:8000/api/upload',{
                method:'POST',
                body:formData,
            })
            const result = await response.json();
            
            if (response.ok){
                setstatus(result.message || 'file uploaded successfully');
                router.push('/character')
            }
            else {
                setstatus(result.message || 'error during file upload');
            }
        }catch(error){
            setstatus("an error occuped during upload")
        }
        
    }


  return (
    <div className='min-h-screen flex items-center justify-center bg-cover bg-center' style={{backgroundImage:"url('/background-pic.jpg')"}}>
    
    <button onClick={()=>router.push("/welcome")}
        className='absolute top-4 left-4 bg-white  rounded-lg py-2 px-4 ' style={{color:"#1976d2"}}>
        Go Back
    </button>
        
        <div className='bg-white p-6 rounded shadow w-80 opacity-90'>
            <h1 className='text-lg font-bold mb-4 text-center'>
                Upload File
            </h1>
            <input 
            type='file'
            onChange={onfilechange}
            className='border p-2 mb-4 w-full'/>
            <button onClick={uploadfile} className=' text-white py-2 px-4 rounded w-full hover:bg-blue-600' style={{backgroundColor:"#1976d2"}}>
                Upload
            </button>
            {status && <p className='mt-4 text-sm'>{status}</p>}
        </div>
      
    </div>
  )
}

export default Upload
