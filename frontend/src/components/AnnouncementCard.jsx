import { formatTransactionDate } from "../utils/format";
import { useState } from 'react';
import { api } from '../context/AuthContext';
import ReactMarkdown from "react-markdown";
import Confirm from "./Confirm";
export default function AnnouncementCard({ announcement, isAdmin, onDeleteSuccess = '' }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); 
    

    const onConfirm = async () => {
        setConfirming(false);
        await handleConfirmed();
    }
    const onClose = async () => {
        setConfirming(false);
    }

    const handleDelete= async () =>{
        setConfirming(true);
    }
    const handleConfirmed = async () => {
        
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

                    {isAdmin &&
                    <button 
                        className={`text-xs ${isDeleting ? 'text-zinc-500 cursor-not-allowed' : 'text-white hover:text-red-500'}`} 
                        disabled={isDeleting}
                        onClick={handleDelete}
                    >
                        <u>delete</u>
                    </button>}
                    
                   
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
                <ReactMarkdown
                components={{
                    a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                        color: "#2563eb",
                        textDecoration: "underline",
                        cursor: "pointer",
                        }}
                    >
                        {children}
                    </a>
                    ),

                    strong: ({ children }) => (
                    <strong
                        style={{
                        fontWeight: 700,
                        }}
                    >
                        {children}
                    </strong>
                    ),

                    em: ({ children }) => (
                    <em
                        style={{
                        fontStyle: "italic",
                        }}
                    >
                        {children}
                    </em>
                    ),
                }}
                >
                    {announcement.body}
                </ReactMarkdown>
                
            </div>

            {confirming &&
            <Confirm onConfirm= {onConfirm} onClose={onClose}/>}

        </div>
    );
}