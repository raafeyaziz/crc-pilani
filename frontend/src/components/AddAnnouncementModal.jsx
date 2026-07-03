import { useState, useEffect } from 'react';
import { api } from '../context/AuthContext';
import Row from "./Row";
import Column from "./Column";
import InputBox from "./InputBox";
import crossIcon from "../assets/cross.svg";
import Button from './Button';

export default function AddAnnouncementModal({
    onClose,
    onSuccess
}){
    const [title, setTitle]= useState('');
    const [body, setBody]= useState('');
    const [posting, setPosting]= useState(false);

    const canPost= title.trim();
    const inputDisabled= posting;
    const postDisabled= !canPost || posting;

    const handlePost= async ()=> {
        setPosting(true);
        try {
            
            await api.post("/api/announcements/", {
                title: title.trim(),
                body: body.trim()
            });
            onSuccess();
            onClose();
        }
        catch (e){
            console.log(`could not post: ${e}`);
        } finally {
            setPosting(false);
        }
    };

    return(
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
            
            <Column className="w-full max-w-2xl md:max-w-3xl text-s pb-4 gap-10 bg-black text-white border-2 border-white z-50 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                
                <Row className='border border-white justify-between bg-white text-black text-2xl' >
                    <div className="selection:bg-black selection:text-white px-2">
                        &gt;add-announcement
                    </div>
            
                    <button className="bg-black h-full w-auto px-1 py-1 cursor-pointer" onClick={onClose}>
                        <img src={crossIcon} alt='close' className="h-[1em] w-auto"/>
                    </button>
                 </Row>

                <div className="flex flex-col md:flex-row w-full px-10 gap-1 md:gap-10 md:items-center">
                    <p className='w-20 font-mono flex-shrink-0'>&gt;title</p>
                    <div className="flex flex-1">
                        <InputBox disabled={inputDisabled} type="text"
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}/>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full px-10 gap-1 md:gap-10 md:items-center">
                    <p className='w-20 font-mono flex-shrink-0'>&gt;body</p>
                    <div className="flex flex-1">
                        <textarea 
                            disabled={inputDisabled} 
                            value={body}
                            rows={10}
                            placeholder="absolutely nobody's listening"
                            onChange={(e)=>setBody(e.target.value)}
                            className='p-3 resize-none border-2 w-full text-sm font-mono border-white bg-black text-white outline-none focus:outline-none'
                        />
                    </div>
                </div>

                <Row className='px-10 py-1 justify-end'>
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
                </Row>

            </Column>
        </div>
    )
}