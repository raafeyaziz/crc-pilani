import { formatTransactionDate } from "../utils/format";
import { useState } from 'react';
import { api } from '../context/AuthContext';

export default function AnnouncementCard({ announcement, onDeleteSuccess = '' }) {
    const [isDeleting, setIsDeleting] = useState(false);
    // 1. New state to track if the card is expanded or clamped
    const [isExpanded, setIsExpanded] = useState(false); 
    
    const handleDelete = async () => {
        const confirmed = window.confirm("are you sure?");
        if (!confirmed) return;
        setIsDeleting(true);
        try {
            await api.delete(`/api/announcements/${announcement.id}/`);
            if (onDeleteSuccess) {
                onDeleteSuccess();
            }
        } catch (error) {
            console.error("failed to delete:", error);
            alert(">not deleted hehe");
        } finally {
            setIsDeleting(false);
        }
    };

    return(
        <div className='w-full text-sm py-2 px-2 border-white border flex flex-col gap-2 bg-black transition-all'>
            
            <div className='w-full flex items-start justify-between'>
                <div className="flex-1 min-w-0 pr-4">
                    <p className='text-xl truncate'>&gt;<u>{announcement.title}</u></p>
                    <div className="text-zinc-500 text-xs mt-1">
                        {formatTransactionDate(announcement.created_at)}
                    </div>
                </div>
                
                <div className='flex-shrink-0 flex flex-col items-end gap-2'>
                    <button 
                        className={`text-xs ${isDeleting ? 'text-zinc-500 cursor-not-allowed' : 'text-white hover:text-red-500'}`} 
                        disabled={isDeleting}
                        onClick={handleDelete}
                    >
                        <u>delete</u>
                    </button>
                    
                   
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs font-mono bg-white text-black px-2 hover:bg-zinc-300"
                    >
                        {isExpanded ? "[-] collapse" : "[+] expand"}
                    </button>
                </div>
            </div>
            
            <div 
                className={`w-full min-w-0 text-zinc-400 font-mono whitespace-pre-wrap break-words mt-2 ${
                    isExpanded 
                    ? "h-auto min-h-[3.75rem]" 
                    : "h-[3.75rem] line-clamp-3 overflow-hidden" 
                }`}
            >
                {announcement.body}
            </div>

        </div>
    );
}