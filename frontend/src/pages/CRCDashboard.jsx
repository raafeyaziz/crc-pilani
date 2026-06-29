import { useContext, useEffect, useState } from 'react';
import { AuthContext, api } from '../context/AuthContext';

import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import plusIcon from '../assets/plusIcon.svg';
import configureIcon from '../assets/configure.svg';
import logoutIcon from '../assets/logout.svg';
import moneyIcon from '../assets/money.svg';

import { formatTransactionDate, formatINR } from '../utils/format.js'; 
import TransactionCard from '../components/TransactionCard.jsx';
import TransactionList from '../components/TransactionList.jsx';
import LedgerHeader from '../components/LedgerHeader.jsx';
const CRCDashboard = () => {
  const { logout } = useContext(AuthContext);
  
  // Backend State
  const [ledgers, setLedgers] = useState([]);
  const [newLedgerName, setNewLedgerName] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [ledgerData, setLedgerData]= useState(null);

  useEffect(() => {
    fetchLedgers();
  }, []);
  
  function handleBlur(){
    if (newLedgerName.trim()=='') setAdding(false);
  };

  const fetchLedgerData = async (ledgerId) =>{
    try{
      const res= await api.get(`/api/ledgers/${ledgerId}/summary/`);
      setLedgerData(res.data);
    } catch (error) {
      console.error("Failed to fetch ledger data", error);
    };
  }

  const fetchLedgers = async () => {
    try {
      const res = await api.get('/api/ledgers/');
      setLedgers(res.data);
      if (res.data) {
        setSelectedLedger(res.data[0]);
        fetchLedgerData(res.data[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch ledgers", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLedger = async () => {
    if (!newLedgerName.trim()) return;
    try {
      const res = await api.post('/api/ledgers/', { name: newLedgerName });
      setLedgers([res.data, ...ledgers]);
      setNewLedgerName('');
      setAdding(false);
    } catch (error) {
      console.error("Failed to create ledger", error);
    }
  };

  return (
    // True Black Background from SVG
    <div className="min-h-screen w-full min-w-max bg-black text-white font-geist font-normal flex flex-col gap-2 relative selection:bg-white selection:text-black">
      <header className="w-full">
        <div className="px-10 py-5 w-full mx-auto flex items-center justify-between">
          <div className="text-3xl tracking-wide flex whitespace-nowrap z-10">
            &gt;crc.pilani 
          <span className="inline-block w-[0.5em] h-[1em] bg-white ml-1"></span>
          </div>
          <div className='flex gap-4'>
            <Button also='w-14 h-14'>
            <img src={configureIcon} className='group-hover:invert' alt='.config'/>
            </Button>
            <Button also='w-14 h-14' onClick={logout}>
              <img src={logoutIcon} className='group-hover:invert' alt='logout'/>
            </Button>
          </div>

        </div>
      </header>
{/*main content + nav bar*/}
      <div className=' px-10 flex w-full justify-between'>
        <nav className='flex w-[225px] flex-col gap-4 items-start'>
          <Button size='small' shape='rectangle' also='w-full h-16 text-xl' onClick={()=>{
            setAdding(true);
            setNewLedgerName='';
          }
          }>
      
              <img src={moneyIcon} className='w-[1.5em] h-auto group-hover:invert transition-all duration-200' alt='m'></img>
              add fest
          </Button>
          <aside className='flex w-full h-full min-h-screen my-1 flex-col gap-0 text-white border-white border'>
            <input type='text' placeholder='>terminal█' className='text-black py-1 px-2 placeholder-black selection:text-white selection:bg-black'/>
            <nav>
              {adding && (
                <Input
                autoFocus 
                type="text"
                also='px-2'
                value={newLedgerName}
                onChange={(e)=> setNewLedgerName(e.target.value)}
                onBlur= {handleBlur}
                onKeyDown={(e)=> e.key=="Enter" && handleCreateLedger(newLedgerName)}
                  />
                
              )}
              {ledgers.map((ledger)=>(
                <button 
                onClick={()=> {
                  setSelectedLedger(ledger)
                  fetchLedgerData(ledger.id);
                
                }}
                className={`px-2 py-1 border-white border w-full flex items-start hover:text-black hover:bg-white ${
                  selectedLedger==ledger
                  ? 'bg-white text-black'
                  : 'bg-black text-white'
    
                }`} key={ledger.id}>
                  &gt;{ledger.name}
                </button>
              ))}
            </nav>
          </aside>
        </nav>

        {/* main ledger data is put here */}
        {selectedLedger && ledgerData &&
        <main className='pl-10 gap-16 flex flex-col w-full text-white'>
          <LedgerHeader ledgerData={ledgerData} />

          <div className='flex flex-col w-full gap-10'>
            <div className='flex justify-between items-center w-full'>
              <div className='text-3xl'>
                &gt;all_transactions
              </div>
              <div className='flex gap-4'>
                <Button size='small' shape='square' also='w-14 h-14 text-xs'>
                  view ledger
                </Button>
                <Button size='small' shape='square' also='w-14 h-14 text-xs'>
                  <img src={plusIcon} alt='add' className='group-hover:invert'></img>
                </Button>

              </div>
            </div>
            <TransactionList transactions={ledgerData.transactions}/>
          </div>
        </main>}
        
      </div>
    </div>
  );
};

export default CRCDashboard;