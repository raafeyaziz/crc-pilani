import { useState, useEffect } from 'react';
import { api } from '../context/AuthContext';
import Row from "./Row";
import Column from "./Column";
import InputBox from "./InputBox";
import Button from './Button';
import Modal from './Modal';
import editIcon from "../assets/edit.svg";
import trashIcon from "../assets/trash.svg";
import uploadIcon from "../assets/upload.svg";
import avatarIcon from "../assets/avatar.png"

export default function EditAbout({
member=false,
onClose,
onSuccess=false
}){
    const [name, setName]= useState(member? member.name : '');
    const [bitsId, setBitsId]= useState(member? member.bits_id : '');
    const [role, setRole]= useState(member? member.role : 'volunteer');
    const[avatar, setAvatar]= useState(null); //so we're not showing the old avatar
    const [insta, setInsta]= useState(member? member.instagram : '');
    const [link, setLink]= useState(member? member.linkedin: '');
    const [previewUrl, setPreviewUrl] = useState(null);
    const[posting, setPosting]= useState(false);

    const hasChanges= (!member) || (
        name !== member.name ||
        bitsId !== member.bits_id ||
        role !== member.role ||
        insta !== (member.instagram || '') ||
        link !== (member.linkedin || '') ||
        avatar !== null
    )

    const canPost= name.trim() && bitsId && role && hasChanges;
    const inputDisabled= posting;
    const postDisabled= !canPost || posting;

    const handlePost= async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        
        formData.append('name',name.trim());
        formData.append('bits_id', bitsId.trim());
        formData.append('role', role);

        if (avatar) formData.append('avatar', avatar);
        if (insta) formData.append('instagram', insta.startsWith('http')? insta.trim() : `https://${insta.trim()}`);
        if (insta) formData.append('linkedin', link.startsWith('http')? link.trim() : `https://${link.trim()}`);

        try {
            if (member && member.id){
                await api.patch(`/api/crc-members/${member.id}/`, formData, {
                    headers: {
                        'Content-Type': 'multiport/form-data',
                    }
                })
            }
            else{
                await api.post('/api/crc-members/', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data', 
                    },
                });
            }
            if (onSuccess) onSuccess();
            onClose(); 
        } catch (error) {
            console.error("Upload failed:", error.response?.data || error.message);
            // Let's also pop it up on the screen so you can't miss it
            alert("Django Error: " + JSON.stringify(error.response?.data));
        }

    }
    const handlePhotoChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
        setAvatar(selectedFile);
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(objectUrl);
        }
    };
    useEffect(() => {
        return () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    return(
        <Modal title='edit-crc' onClose={onClose}>
            {/*members.map((member)=>(
                <div className='border m-4 items-center flex justify-between border-white px-2 py-2 text-base md:text-xl' key={member.id}>
                    <span>&gt;{member.name}</span>
                    <div className='flex gap-4'>
                        <Button>
                            <img src={editIcon} alt='edit' className='group-hover:invert'/>
                        </Button>
                        <Button >
                            <img src={trashIcon} alt='edit' className='group-hover:invert'/>
                        </Button>
                    </div>
                </div>
            ))
            */}    
            <header className='flex flex-col w-full items-center gap-2'>
                <div className='border border-white text-sm font-mono w-32 h-32 flex items-center justify-center'> 
                    <u><img src={previewUrl} alt='upload' className='min-w-0'></img></u>
                </div>  
                <input type='file' accept='image/*' className='text-xs w-32 font-mono border file:bg-black file:text-white file:border-0 file:px-4 file:py-1 cursor-pointer'
                onChange={handlePhotoChange}/>
            </header>     

            <div className="flex flex-col md:flex-row w-full px-10 gap-1 md:gap-10 md:items-center">
                <p className='w-20 font-mono flex-shrink-0'>&gt;name</p>
                <div className="flex flex-1">
                    <InputBox disabled={inputDisabled} type="text"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row w-full px-10 gap-1 md:gap-10 md:items-center">
                <p className='w-20 font-mono flex-shrink-0'>&gt;bits_id</p>
                <div className="flex flex-1">
                    <InputBox disabled={inputDisabled} type="text"
                    value={bitsId}
                    onChange={(e)=> setBitsId(e.target.value)}/>
                </div>
                <div className='flex gap-4'>
                    <button disabled={inputDisabled} onClick= {()=>setRole("signatory")} className={`border hover:bg-green hover:text-black flex items-center px-5 py-2 border-white text-xs ${role=='signatory'? 'bg-green text-black' : 'bg-black text-white'}`}>signatory</button>
                    <button disabled={inputDisabled} onClick= {()=>setRole("volunteer")} className={`border hover:bg-red hover:text-white flex items-center px-5 py-2 border-white text-xs ${role=='volunteer'? 'bg-red text-white' : 'bg-black text-white'}`}>volunteer</button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row w-full px-10 gap-1 md:gap-10 md:items-center">
                <p className='w-20 font-mono flex-shrink-0'>&gt;instagram</p>
                <div className="flex flex-1">
                    <InputBox disabled={inputDisabled} type="text"
                    value={insta}
                    onChange={(e)=> setInsta(e.target.value)}/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row w-full px-10 gap-1 md:gap-10 md:items-center">
                <p className='w-20 font-mono flex-shrink-0'>&gt;linkedIn</p>
                <div className="flex flex-1">
                    <InputBox disabled={inputDisabled} type="text"
                    value={link}
                    onChange={(e)=> setLink(e.target.value)}/>
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
        </Modal>
    )
}