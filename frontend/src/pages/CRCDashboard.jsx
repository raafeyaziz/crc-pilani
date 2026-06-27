import { useContext, useEffect, useState } from 'react';
import { AuthContext, api } from '../context/AuthContext';

import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';

import configureIcon from '../assets/configure.svg';
import logoutIcon from '../assets/logout.svg';
import moneyIcon from '../assets/money.svg';

const CRCDashboard = () => {
  const { logout } = useContext(AuthContext);
  
  // Backend State
  const [ledgers, setLedgers] = useState([]);
  const [newLedgerName, setNewLedgerName] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchLedgers();
  }, []);

  const fetchLedgers = async () => {
    try {
      const res = await api.get('/api/ledgers/');
      setLedgers(res.data);
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
        <div className="px-10 py-5 max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-3xl tracking-wide flex whitespace-nowrap z-10">
            &gt;crc.pilani 
          <span className="inline-block w-[0.5em] h-[1em] bg-white ml-1"></span>
          </div>
          <div className='flex gap-4'>
            <Button also='w-16 h-16'>
            <img src={configureIcon} className='group-hover:invert' alt='.config'/>
            </Button>
            <Button also='w-16 h-16' onClick={logout}>
              <img src={logoutIcon} className='group-hover:invert' alt='logout'/>
            </Button>
          </div>

        </div>
      </header>
{/*navigation bar*/}
      <div className='px-10 flex w-full justify-between'>
        <nav className='flex w-[200px] flex-col gap-4 items-start'>
          <Button size='small' shape='rectangle' also='w-full h-16' onClick={()=>{
            setAdding(true);
            setNewLedgerName='';
          }
          }>
      
              <img src={moneyIcon} className='w-[1.5em] h-auto group-hover:invert transition-all duration-200' alt='m'></img>
              add fest
          </Button>
          <aside className='flex w-full flex-col gap-0 text-white'>
            <input type='text' placeholder='>terminal█' className='text-black py-1 px-2 placeholder-black selection:text-white selection:bg-black'/>
            <nav>
              {adding && (
                <input 
                autoFocus 
                type="text"
                className='w-full'
                text-black
                value={newLedgerName}
                onChange={(e)=> setNewLedgerName(e)}
                onKeyDown={(e)=> e.key=="Enter" && handleCreateLedger(newLedgerName)}
                  />
                
              )}
              {ledgers.map((ledger)=>(
                <button className='px-2 py-1 border-white border w-full flex items-start hover:text-black hover:bg-white' key={ledger.id}>
                  &gt;{ledger.name}
                </button>
              ))}
            </nav>
          </aside>
         

        </nav>
      </div>
    
      

      {/* ================= SIDEBAR (Based on explicit SVG Box Heights) ================= */}
      <aside className="w-[332px] flex flex-col h-screen sticky top-0 bg-[#000001] border-r-2 border-[#FEFEFE]">
        
        <div className="p-10 mb-8">
          <div className="text-3xl tracking-wide flex items-center whitespace-nowrap ">
            &gt;crc.pilani
            <span className="inline-block w-[0.5em] h-[1em] bg-[#FEFEFE] ml-2 animate-[pulse_1s_infinite]"></span>
          </div>
        </div>

        {/* Stacked Brutalist Menu Boxes */}
        <nav className="flex flex-col w-full text-xl tracking-widest lowercase">
          {/* Active Item: White Background */}
          <button className="w-full text-left bg-[#FEFEFE] text-black  border-y-2 border-[#FEFEFE] px-10 py-5 transition-colors">
            [ home ]
          </button>
          
          {/* Inactive Items: Black background, white border */}
          <button className="w-full text-left bg-black text-white hover:bg-white hover:text-black  border-b-2 border-[#FEFEFE] px-10 py-5 transition-colors">
            [ users_reqs ]
          </button>
          <button className="w-full text-left bg-black text-[#8B8B8B] hover:bg-white hover:text-black  border-b-2 border-[#FEFEFE] px-10 py-5 transition-colors">
            [ oasis_25 ]
          </button>
          <button className="w-full text-left bg-black text-[#8B8B8B] hover:bg-white hover:text-black  border-b-2 border-[#FEFEFE] px-10 py-5 transition-colors">
            [ apogee_25 ]
          </button>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-16 pt-32 flex flex-col gap-y-16 max-w-6xl relative">
        
        {/* TOP SUMMARY BAR (Green & Red Stats) */}
        <div className="flex space-x-16 mb-8 border-b-2 border-[#FEFEFE] pb-8">
            <div>
                <p className="text-[#8B8B8B] tracking-widest uppercase text-sm mb-2">Total Revenue</p>
                <p className="text-[#60D479] text-5xl  tracking-widest">+ ₹0</p>
            </div>
            <div>
                <p className="text-[#8B8B8B] tracking-widest uppercase text-sm mb-2">Total Expense</p>
                <p className="text-[#B81413] text-5xl  tracking-widest">- ₹0</p>
            </div>
        </div>

        {/* CREATE LEDGER BLOCK */}
        <section className="flex flex-col space-y-6">
          <h1 className="text-3xl  tracking-widest lowercase text-[#FEFEFE]">
            &gt;create_ledger
          </h1>
          
          <div className="bg-black flex flex-row items-center justify-between p-6 border-[3px] border-[#FEFEFE]">
            <div className="flex flex-row items-center space-x-6 w-full">
              <span className="text-xl  tracking-widest whitespace-nowrap lowercase">
                &gt;name:
              </span>
              <input 
                type="text" 
                value={newLedgerName}
                onChange={(e) => setNewLedgerName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateLedger()}
                placeholder="enter_ledger_id"
                className="bg-transparent text-[#8B8B8B] placeholder-[#8B8B8B]/50 text-2xl focus:outline-none focus:text-white w-full tracking-widest uppercase "
              />
            </div>
            
            <button onClick={handleCreateLedger} className="hover:bg-white hover:text-black transition-colors px-6 py-2 border-2 border-white text-xl  tracking-widest cursor-pointer">
               [ submit ]
            </button>
          </div>
        </section>

        {/* RECENT LEDGERS GRID (162px Height Cards) */}
        <section className="flex flex-col space-y-8 mt-10">
          <h2 className="text-3xl  tracking-widest lowercase text-[#FEFEFE]">
            &gt;active_ledgers
          </h2>
          
          <ul className="flex flex-col w-full space-y-6">
            {loading ? (
              <p className="text-xl animate-pulse tracking-widest text-[#60D479]">&gt; querying_database...</p>
            ) : ledgers.length === 0 ? (
              <p className="text-xl tracking-widest text-[#8B8B8B]">no_ledgers_found.</p>
            ) : (
              ledgers.map((ledger) => (
                // The 1231x162 Box from your SVG
                <li key={ledger.id} className="w-full h-[162px] border-[3px] border-[#FEFEFE] p-8 flex justify-between items-center bg-black hover:bg-white/5 transition-colors">
                  
                  {/* Left: Info */}
                  <div className="flex flex-col justify-center h-full space-y-2">
                    <span className="text-3xl  tracking-widest uppercase text-[#FEFEFE]">
                      {ledger.name}
                    </span>
                    <span className="text-sm tracking-widest text-[#8B8B8B]">
                      SYS_ID: {ledger.id} // EST: {new Date(ledger.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Right: Data & Buttons */}
                  <div className="flex space-x-12 items-center">
                    
                    {/* Revenue (SVG Hex #60D479) */}
                    <div className="flex flex-col items-end">
                       <span className="text-[#8B8B8B] text-xs tracking-widest uppercase mb-1">Revenue</span>
                       <span className="text-[#60D479] text-2xl  tracking-widest">+ ₹0</span>
                    </div>

                    {/* Expense (SVG Hex #B81413) */}
                    <div className="flex flex-col items-end">
                       <span className="text-[#8B8B8B] text-xs tracking-widest uppercase mb-1">Expense</span>
                       <span className="text-[#B81413] text-2xl  tracking-widest">- ₹0</span>
                    </div>

                    {/* The 79x33 Grey Button from your SVG */}
                    <button className="border-2 border-[#8B8B8B] text-[#8B8B8B] w-[79px] h-[35px] flex items-center justify-center hover:border-white hover:text-white transition-colors text-sm tracking-widest  lowercase">
                      view
                    </button>

                  </div>
                </li>
              ))
            )}
          </ul>
        </section>

      </main>
    </div>
  );
};

export default CRCDashboard;