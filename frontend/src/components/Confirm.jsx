import { useState, useEffect } from 'react';
import { api } from '../context/AuthContext';
import Row from "./Row";
import Column from "./Column";
import InputBox from "./InputBox";
import crossIcon from "../assets/cross.svg";
import Button from './Button';

export default function Confirm({
    onClose,
    onConfirm
}){

    return(
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
            
            <Column className="w-full max-w-lg md:max-w-xl text-s pb-4 gap-10 bg-black text-white border-2 border-white z-50 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                
                <Row className='border border-white justify-between bg-white text-black text-2xl' >
                    <div className="flex selection:bg-black selection:text-white px-2">
                        &gt;confirm   
                        
                    </div>
                    
            
                    <button className="bg-black hover:bg-red h-full w-auto px-1 py-1 cursor-pointer" onClick={onClose}>
                        <img src={crossIcon} alt='close' className="h-[1em] w-auto"/>
                    </button>
                 </Row>


                <div className="flex flex-col md:flex-row w-full px-10 gap-1 md:gap-10 md:items-center">
                    <p className=' font-mono text-base md:text-lg flex-shrink-0'>&gt;are you sure?</p>
                </div>

                <Row className='px-10 py-1 gap-2 justify-end'>
                    <button  
                        onClick={onConfirm} 
                        className='w-24 px-6 py-2 group flex justify-center items-center bg-black transition-all duration-200 border-t-[2px] border-l-[2px] border-r-[6px] border-b-[6px] 
                            border-white text-white hover:bg-green hover:text-black hover:border-green cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:border-r-[4px] active:border-b-[4px]'
                    >
                        yes
                    </button>
                    <button  
                        onClick={onClose} 
                        className='w-24 px-6 py-2 group flex justify-center items-center bg-black transition-all duration-200 border-t-[2px] border-l-[2px] border-r-[6px] border-b-[6px] 
                            border-white text-white  hover:bg-red hover:border-red cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:border-r-[4px] active:border-b-[4px]'
                    >
                    
                        no
                    </button>
                </Row>

            </Column>
        </div>
    )
}