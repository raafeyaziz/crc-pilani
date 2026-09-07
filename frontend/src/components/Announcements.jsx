import { useContext, useEffect, useState } from 'react';
import { AuthContext, api } from '../context/AuthContext';

import plusIcon from '../assets/plus.svg';
import Button from './Button';
import AnnouncementCard from './AnnouncementCard';
import AddAnnouncementModal from './AddAnnouncementModal';

export default function Announcements({
    isAdmin=false
}){

    const [announcements, setAnnouncements]= useState([]);
    const [adding, setAdding]= useState(false);

    const fetchAnnouncements=async ()=>{
        try{
            const res= await api.get('/api/announcements/');
            setAnnouncements(res.data);
        } catch (e){
            console.log(`unannounced: ${e}`);
        }
    }
    useEffect(()=>{
        fetchAnnouncements();
    }, [])

    return(
        <main className='flex flex-col flex-1 mb-1 gap-4 min-w-0'>
            <div className='flex text-2xl md:text-3xl justify-between items-center w-full'>        
                &gt;announcements
                {isAdmin &&
                <Button onClick={()=>setAdding(true)} size='small' shape='square' also='w-14 h-14 text-xs'>
                    <img src={plusIcon} alt='add' className='group-hover:invert'></img>
                </Button>}        
            </div>
            <div className='flex flex-col gap-2'>
                {announcements.map((announcement)=>(
                    <AnnouncementCard isAdmin={isAdmin} key={announcement.id} announcement={announcement} onDeleteSuccess={fetchAnnouncements}/>
                ))}
            </div>
             {adding &&
             <AddAnnouncementModal onClose={()=>setAdding(false)} onSuccess={()=>fetchAnnouncements()} />
             }
        </main>
    )
}