import { formatTransactionDate } from "../utils/format";
import { formatINR } from "../utils/format";
import { useState } from "react";
import { api } from "../context/AuthContext";
import PayletModal from "./PayletModal";
import Confirm from "./Confirm";
import trashIcon from "../assets/trash.svg";

export default function TransactionCard({transaction, handleGetPaylet=null, onDeleteSuccess}){
    const [isDeleting, setIsDeleting]= useState(false);
    const [confirming, setConfirming]= useState(false);

    const onConfirm= async () => {
        setConfirming(false);
        await handleConfirmed();
    }
    const onClose= async () => {
        setConfirming(false);
    }

    const handleDelete= async () => {
        setConfirming(true);
    }
    const handleConfirmed = async () => {
        setIsDeleting(true);
        try {
            await api.delete(`/api/transactions/${transaction.id}/`);
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
            
        <div className='w-full py-1 px-1 border-white border  flex flex-col gap-2'>
            <div className='w-full flex items-center justify-between'>
                <p className='text-base md:text-xl'>&gt;{transaction.title}</p>
                <div className='px-3 flex gap-6'>
                <button disabled={isDeleting} className='text-xs text-white' onClick={()=>handleGetPaylet(transaction)}>
                    <u>getPaylet</u>
                </button>

                <button disabled={isDeleting} className='group text-xs text-white' onClick={handleDelete}>
                    <img src={trashIcon} alt='delete' className="w-[1.2rem] h-auto group-hover:[filter:invert(70%)_sepia(95%)_saturate(4447%)_hue-rotate(352deg)_brightness(85%)_contrast(91%)]"/>
                </button>
                </div>
                
            </div>
            <div className='flex w-full items-center justify-between px-3 md:px-4 pb-2'>
                <div className='flex flex-col gap-2'>
                <div className='flex gap-1 '>
                    <p className='border-grey flex items-center text-grey text-xs border p-0.5 md:p-1'>
                        {transaction.subcategory_name}
                    </p>
                    <p className='border-grey flex items-center text-grey text-xs border p-0.5 md:p-'>
                        {transaction.transaction_type}
                    </p>
                </div> 
                <p className='text-grey text-xs md:text-base'>
                    {formatTransactionDate(transaction.created_at)}
                </p>
                </div>

                <p className={`text-xl md:text-2xl ${
                transaction.transaction_type.toLowerCase()=='expense' ?
                'text-red'
                : 'text-green'
                }`}>
                {formatINR(transaction.amount)}
                </p>
            </div>

            {confirming &&
            <Confirm onConfirm={onConfirm} onClose={onClose}/>}

        
        </div>
             
    );
}