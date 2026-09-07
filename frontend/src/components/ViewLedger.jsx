import LedgerHeader from "./LedgerHeader";
import Row from "./Row";
import Column from "./Column";
import { formatINR } from "../utils/format";
import crossIcon from "../assets/cross.svg";
import Modal from "./Modal";

export default function ViewLedger({
ledgerData,
onClose
}){
    return(
        <Modal title={ledgerData.ledger_name} onClose={onClose}>
            <main className='overflow-y-auto  flex flex-col items-center'>
                <header className='md:gap-6 gap-4 pb-10 flex flex-col w-full text-white'>
        
                    <div>
                        <p className={`text-3xl md:text-4xl w-full flex items-center justify-center ${
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
                        <p className='text-grey text-xs md:text-sm w-full flex items-center justify-center'>
                        net balance
                        </p>
                    </div>
                    <div className="flex items-center gap-3 text-xl justify-center text-grey">
                        <hr className='border-t w-1/4 border-grey'/>
                        <span>=</span>
                        <hr className='w-1/4 border-t border-grey'/>
                    </div>
                    <div className='w-full md:gap-20 gap-4 px-4 md:px-20 flex flex-col md:flex-row items-center'>
                        <div className='flex flex-col w-1/2 justify-center items-start'>
                        <p className='text-green text-2xl md:text-3xl flex w-full justify-center'> 
                            +{formatINR(ledgerData.total_revenue).substring(1)}
                        </p>
                        <p className='text-grey text-xs md:text-sm w-full flex items-center justify-center'>
                        revenue
                        </p>
                        
                        </div>

                        <div className='flex flex-col w-1/2 justify-center items-center'>
                        <p className='text-red text-2xl md:text-3xl flex justify-center'> 
                            -{formatINR(ledgerData.total_expense).substring(1)}
                        </p>
                        <p className='text-grey text-xs md:text-sm w-full flex items-center justify-center'>
                        expense
                        </p>
                        
                        </div>
                    </div>
                </header>

                <div className="flex flex-col md:flex-row gap-4 md:gap-2 w-full items-start justify-center px-5">
                    <Column className='w-full px-2'>
                        <div className="flex items-center gap-1  px-1 w-full text-sm md:text-base bg-white text-black selection:bg-black selection:text-white">
                            &gt;revenue <div className="bg-black w-[0.75em] h-[1.25em]"/>
                        </div>
                        <div className="text-sm w-full">
                            {ledgerData.revenue_breakdown.map((item, idx)=>(
                                <div key={idx} className="px-1 md:py-1 py-0.5 flex justify-between border-white border">
                                    <span>{item.subcategory__name}</span>
                                    <span>{formatINR(item.total)}</span>
                                </div>
                            ))}
                        </div>
                    </Column>
                    <Column className='w-full pb-2 px-2'>
                        <div className="flex items-center gap-1 px-1 w-full text-sm md:text-base bg-white text-black selection:bg-black selection:text-white">
                            &gt;expense <div className="bg-black w-[0.75em] h-[1.25em]"/>
                        </div>
                        <div className="text-sm w-full">
                            {ledgerData.expense_breakdown.map((item, idx)=>(
                                <div key={idx} className="px-1 md:py-1 py-0.5 flex justify-between border-white border">
                                    <span>{item.subcategory__name}</span>
                                    <span>{formatINR(item.total)}</span>
                                </div>
                            ))}
                        </div>
                    </Column>
                </div>
            </main>
        </Modal>
    );
}