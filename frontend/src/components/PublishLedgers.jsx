import { useState, useEffect } from "react";
import { api } from "../context/AuthContext";

import Button from "./Button";
import Row from "./Row";
import Column from "./Column";
import Confirm from "./Confirm";
import tickIcon from "../assets/tick.svg";
import trashIcon from "../assets/trash.svg";

export default function PublishLedgers({}){
    const [ledgers, setLedgers]= useState([]);
    const [loading, setLoading]= useState(true);
    const [patching, setPatching]=useState(false);
    const [isDeleting, setIsDeleting]= useState(false);
    
    const [confirming, setConfirming]= useState(false);
    const [ledgerToDelete, setLedgerToDelete]= useState(null);
    const buttonDisable= patching || isDeleting;

    const onConfirm= async () => {
        if (!ledgerToDelete) return;
        setConfirming(false);
        await handleConfirmed(ledgerToDelete);
    }
    const onClose= async () => {
        setConfirming(false);
        setLedgerToDelete(false);
    }

    const handleClick= async (ledger)=>{
        const prevState= [...ledgers];
        setLedgers(prevLedgers=> prevLedgers.map(l=> l.id===ledger.id? {...l, is_published: !l.is_published} : l));
        const payload= {
            name: ledger.name,
            is_published: !ledger.is_published
        }
        try{
            await api.patch(`/api/ledgers/${ledger.id}/`, payload);
            
        }catch(e){
            console.error('could not (un)publish:', e);
            setLedgers(prevState);
        }
    }

    const fetchLedgers= async ()=>{
        try{
            const res= await api.get('api/ledgers/');
            setLedgers(res.data);
            setLoading(false);
        } catch(e){
            console.error('could not fetch ledgers:', e);
        }
    }

    const handleDelete = async (ledger) => {
        setConfirming(true);
        setLedgerToDelete(ledger);
    }

    const handleConfirmed = async (ledger) => {
        setIsDeleting(true);
        try {
            await api.delete(`/api/ledgers/${ledger.id}/`);
            fetchLedgers();
        } catch (error) {
            console.error("failed to delete:", error);
            alert(">not deleted hehe");
        } finally {
            setIsDeleting(false);
            setConfirming(false);
            setConfirmed(false);
        }
    };

    useEffect(()=>{
        fetchLedgers();
    }, []);

    return(
        <main className='flex flex-col flex-1 gap-2 min-w-0'>
            <div className='flex text-2xl md:text-3xl justify-between items-center w-full'>        
                &gt;publish_ledgers
                
            </div>
            <div className='flex flex-col w-full py-5 md:py-10'>
                    {ledgers.map(ledger=>(
                        <div className='flex w-full items-center justify-between px-2 md:px-4 border' key={ledger.id}>
                            <p>&gt;{ledger.name}</p>
                            <div className="flex items-end justify-between">
                                <button disabled={buttonDisable} className='group text-xs text-white' onClick={()=>handleDelete(ledger)}>
                                    <img src={trashIcon} alt='delete' className="w-[1.2rem] m-2 h-auto group-hover:[filter:invert(70%)_sepia(95%)_saturate(4447%)_hue-rotate(352deg)_brightness(85%)_contrast(91%)]"/>
                                </button>
                                <Column className='text-[0.75rem] items-center p-2'>
                                    <p>&gt;publish</p>
                                    <button disabled={buttonDisable} className={`group border p-0.5 w-5 h-5 ${ledger.is_published? '' : 'hover:bg-white'}`} onClick={()=>handleClick(ledger)}>
                                        {ledger.is_published && 
                                        <img src={tickIcon} alt='y'/>}
                                    </button>
                                </Column>
                            </div>
                        </div>
                    ))}
                </div>
                {confirming &&
                <Confirm onConfirm={onConfirm} onClose={onClose}/>
                }
        </main>
        

    )
}