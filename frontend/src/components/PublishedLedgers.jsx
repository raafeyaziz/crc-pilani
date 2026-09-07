import { useState, useEffect } from "react";
import { api } from "../context/AuthContext";

import Button from "./Button";
import Row from "./Row";
import Column from "./Column";
import ViewLedger from "./ViewLedger";
import tickIcon from "../assets/tick.svg";
import viewIcon from '../assets/info.svg';

export default function PublishedLedgers({}){
    const [ledgers, setLedgers]= useState([]);
    const [loading, setLoading]= useState(true);
    const [viewing, setViewing]=useState(false);
    const [ledgerData, setLedgerData]= useState(null);

    const handleClick= async (ledgerId)=>{
        try{
            setLoading(true);
            const res= await api.get(`/api/ledgers/${ledgerId}/ledgerSummary/`);
            setLedgerData(res.data);
            setViewing(true);
        } catch(e){
            console.error('could not fetch ledger data:', e)
        } finally{
            setLoading(false);
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

    useEffect(()=>{
        fetchLedgers();
    }, []);

    return(
        <main className='flex flex-col flex-1 gap-2 min-w-0'>
            <div className='flex text-2xl md:text-3xl justify-between items-center w-full'>        
                &gt;published_ledgers
                
            </div>
            <div className='flex flex-col w-full py-5 md:py-10'>
                {ledgers.map(ledger=>(
                    <div className='flex w-full items-center justify-between px-2 md:px-4 border' key={ledger.id}>
                        <p>&gt;{ledger.name}</p>
                        <Column className='text-[0.75rem] items-center p-2'>
                            <button 
                            onClick= {()=>handleClick(ledger.id)}
                            className={`group border-t border-l border-r-4 w-8 h-8 border-b-4 p-1 hover:bg-white`}>
                                <img src={viewIcon} alt='view' className='group-hover:invert'/>
                            </button>
                        </Column>
                    </div>
                ))}
            </div>
            {viewing && 
            <ViewLedger ledgerData={ledgerData} onClose={()=>setViewing(false)}/>}
        </main>

    )
}