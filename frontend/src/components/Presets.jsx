import { useEffect, useState } from 'react';
import { AuthContext, api } from '../context/AuthContext';

import Button from './Button';
import plusIcon from '../assets/plus.svg';


export default function Presets({}){
    const [templateExists, setTemplateExists]=useState(false);
    const [template, setTemplate]= useState(null);
    const [loading, setLoading]= useState(true);
    const [uploading, setUploading]= useState(false);
    const postDisabled=uploading || !template;
    const fetchTemplate= async ()=>{
        setLoading(true);
        try{
            const res= await api.get('/api/upload-template/');
            if (res.data.exists){
                setTemplateExists(true)
            }
            setLoading(false)
        } catch(e){
            console.error('failed to get template status: ', e);
        }
    }
    const handlePost= async ()=>{
        const formData= new FormData();
        formData.append('file', template);
        setUploading(true);
        try{
            await api.post('api/upload-template/', formData, {
                headers: {
                    'Content-Type': 'multipart/form=data',
                }
            })
            setUploading(false);
            fetchTemplate();
        } catch(e){
            console.error('Could not save: ', e);
        }
    }

    const handleFileChange= (e)=>{
        const file= e.target.files[0];
        if (!file) return;
        setTemplate(file);
    }

    useEffect(()=>{
        fetchTemplate();
    }, [])

    return(
        <main className='flex flex-col gap-2 flex-1 min-w-0'>
            <div className='flex text-2xl md:text-3xl justify-between items-center w-full'>        
                &gt;presets      
            </div>
            <div className='flex flex-col py-5 md:py-10'>
                <div className='flex border p-2 text-base md:text-xl justify-between items-center w-full'>
                  
                    <div className='flex flex-col'>    
                        &gt;paylet_template   
                        {templateExists ? <span className='text-green text-sm md:text-base font-mono'>added!</span> : 
                        <span className='text-grey text-sm md:text-base font-mono'> not found. </span>
                        }      
                    </div>   
                    <input type='file' className='text-xs flex w-24 md:w-32 font-mono file:border-t file:border-l file:border-r-4 file:border-b-4 file:border-white file:bg-black file:text-white  px-1 file:md:px-4 file:py-1 file:cursor-pointer'
                    onChange={handleFileChange}/>  
                </div>
            </div>
            <div className='flex w-full justify-end'>
                    <button 
                        disabled={postDisabled} 
                        onClick={handlePost} 
                        className={`px-6 py-2 group flex justify-center items-center bg-black transition-all duration-200 border-t-[2px] border-l-[2px] border-r-[6px] border-b-[6px] ${
                            postDisabled 
                            ? 'text-zinc-600 border-zinc-600 cursor-not-allowed opacity-50' 
                            : 'border-white text-white hover:text-black hover:bg-white cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:border-r-[4px] active:border-b-[4px]'
                        }`}
                    >
                        Post
                    </button>
            </div>
        </main>
    )
}