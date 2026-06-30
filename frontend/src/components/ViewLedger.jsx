import LedgerHeader from "./LedgerHeader";
import Row from "./Row";
import Column from "./Column";
import { formatINR } from "../utils/format";
import crossIcon from "../assets/cross.svg";


export default function ViewLedger({
ledgerData,
onClose
}){
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        <Column className="text-s pb-10 max-h-[calc(100dvh-2rem)] overflow-hidden gap-10 bg-black text-white border border-white">
            <Row className='border border-white justify-between bg-white text-black text-2xl' >
                <div className="selection:bg-black selection:text-white">
                &gt;{ledgerData.ledger_name}
                </div>
            
                <button className="bg-black h-full w-auto px-1 py-1" onClick={onClose}>
                    <img src={crossIcon} alt='close' className="h-[1em] w-auto"/>
                </button>
            </Row>
            
            <main className='overflow-y-auto'>
                <header className='gap-10 pb-10 flex flex-col w-full text-white'>
        
                    <div>
                        <p className={`text-4xl  w-full flex items-center justify-center ${
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
                        <p className='text-grey text-sm w-full flex items-center justify-center'>
                        net balance
                        </p>
                    </div>
                    <div className='w-full md:gap-20 gap-4 px-4 md:px-20 flex items-center'>
                        <div className='flex flex-col w-1/2 justify-center items-start'>
                        <p className='text-green text-3xl flex w-full justify-center'> 
                            {formatINR(ledgerData.total_revenue).substring(1)}
                        </p>
                        <p className='text-grey text-sm w-full flex items-center justify-center'>
                        (+) debit
                        </p>
                        
                        </div>

                        <div className='flex flex-col w-1/2 justify-center items-center'>
                        <p className='text-red text-3xl flex justify-center'> 
                            {formatINR(ledgerData.total_expense).substring(1)}
                        </p>
                        <p className='text-grey text-sm w-full flex items-center justify-center'>
                        (-) credit
                        </p>
                        
                        </div>
                    </div>
                </header>

                <div className="flex flex-col md:flex-row gap-4 md:gap-2 w-full items-start justify-center px-5">
                    <Column className='w-full px-2'>
                        <div className="flex items-center gap-1  px-1 w-full text-m bg-white text-black selection:bg-black selection:text-white">
                            &gt;revenue <div className="bg-black w-[0.75em] h-[1.25em]"/>
                        </div>
                        <div className="text-sm w-full">
                            {ledgerData.revenue_breakdown.map((item, idx)=>(
                                <div key={idx} className="px-1 flex justify-between border-white border">
                                    <span>{item.subcategory__name}</span>
                                    <span>{formatINR(item.total)}</span>
                                </div>
                            ))}
                        </div>
                    </Column>
                    <Column className='w-full px-2'>
                        <div className="flex items-center gap-1 px-1 w-full text-m bg-white text-black selection:bg-black selection:text-white">
                            &gt;expense <div className="bg-black w-[0.75em] h-[1.25em]"/>
                        </div>
                        <div className="text-sm w-full">
                            {ledgerData.expense_breakdown.map((item, idx)=>(
                                <div key={idx} className="px-1 flex justify-between border-white border">
                                    <span>{item.subcategory__name}</span>
                                    <span>{formatINR(item.total)}</span>
                                </div>
                            ))}
                        </div>
                    </Column>
                </div>
            </main>
            
        </Column>
        </div>
    );
}