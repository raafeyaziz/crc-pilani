import { formatINR } from "../utils/format";

export default function LedgerHeader({ledgerData}){
    return (
        <header className='gap-10 flex flex-col w-full text-white'>
    
        <div>
            <p className={`text-5xl w-full flex items-center justify-center ${
            ledgerData.net_balance > 0 ?
            'text-green'
            : ledgerData.net_balance < 0 ?
            'text-red'
            : 'text-grey'
            }`}>
            {ledgerData.net_balance > 0 ?
            '+'
            : ledgerData.net_balance < 0 ?
            '-'
            : ''}
            {formatINR(Math.abs(ledgerData.net_balance)).substring(1)}
            </p>
            <p className='text-grey text-m w-full flex items-center justify-center'>
            net balance
            </p>
        </div>
        <div className='w-full flex items-center'>
            <div className='flex flex-col w-1/2 justify-center items-start'>
            <p className='text-green text-4xl flex w-full justify-center'> 
                {formatINR(ledgerData.total_revenue).substring(1)}
            </p>
            <p className='text-grey text-m w-full flex items-center justify-center'>
            (+) debit
            </p>
            
            </div>

            <div className='flex flex-col w-1/2 justify-center items-center'>
            <p className='text-red text-4xl flex justify-center'> 
                {formatINR(ledgerData.total_expense).substring(1)}
            </p>
            <p className='text-grey text-m w-full flex items-center justify-center'>
            (-) credit
            </p>
            
            </div>
        </div>
        </header>       
    );
}