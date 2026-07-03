import { formatTransactionDate } from "../utils/format";
import { formatINR } from "../utils/format";
import PayletModal from "./PayletModal";
export default function TransactionCard({transaction, handleGetPaylet=null}){
    return(
            
        <div className='w-full py-1 px-1 border-white border  flex flex-col gap-2'>
            <div className='w-full flex items-center justify-between'>
                <p className='text-base md:text-xl'>&gt;{transaction.title}</p>
                <div className='px-3'>
                <button className='text-xs text-white' onClick={()=>handleGetPaylet(transaction)}>
                    <u>getPaylet</u>
                </button>
                </div>
                
            </div>
            <div className='flex w-full items-center justify-between px-3 md:px-4 pb-2'>
                <div className='flex flex-col gap-2'>
                <div className='flex gap-1 '>
                    <p className='border-grey text-grey text-xs border p-0.5 md:p-1'>
                        {transaction.subcategory_name}
                    </p>
                    <p className='border-grey text-grey text-xs border p-0.5 md:p-'>
                        {transaction.transaction_type}
                    </p>
                </div> 
                <p className='text-grey text-xs md:text-base'>
                    {formatTransactionDate(transaction.created_at)}
                </p>
                </div>

                <p className={`text-xl md:text-3xl ${
                transaction.transaction_type.toLowerCase()=='expense' ?
                'text-red'
                : 'text-green'
                }`}>
                {formatINR(transaction.amount)}
                </p>
            </div>

        
        </div>
             
    );
}