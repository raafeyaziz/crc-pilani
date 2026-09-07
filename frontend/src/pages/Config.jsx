import { useContext, useEffect, useState } from 'react';
import { AuthContext, api } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 

import menuIcon from '../assets/menu.svg';
import logoutIcon from '../assets/logout.svg';

import Button from '../components/Button.jsx';
import Announcements from '../components/Announcements.jsx';
import About from '../components/About.jsx';
import Presets from '../components/Presets.jsx';
import PublishLedgers from '../components/PublishLedgers.jsx';

export default function Config({}){
    const navigate= useNavigate();
    const { logout } = useContext(AuthContext);
    const [page, setPage]= useState('announcements');

    const section = {
        announcements: <Announcements isAdmin={true}/>,
        crc: <About isAdmin={true}/>,
        presets: <Presets />,
        publish: <PublishLedgers />
    }

    return(
        <div className="md:px-10 px-5 min-h-screen bg-black text-white font-geist font-normal flex flex-col gap-2 relative selection:bg-white selection:text-black">
            <header className="">
                <div className=" py-5 mx-auto w-full flex items-center justify-between">
                    <div className="text-2xl md:text-3xl tracking-wide items-center flex whitespace-nowrap z-10">
                        &gt;crc.pilani 
                        <span className="inline-block w-[0.5em] h-[1em] bg-white ml-1"></span>
                    </div>
                    <div className='flex gap-4'>
                        <Button also='w-14 h-14' onClick={()=>navigate('/crc-dashboard')}>
                            <img src={menuIcon} className='group-hover:invert' alt='.config'/>
                        </Button>
                        <Button also='w-14 h-14' onClick={logout}>
                            <img src={logoutIcon} className='group-hover:invert' alt='logout'/>
                        </Button>
                    </div>
        
                </div>
            </header>
              
            <div className='md:flex-row flex-1 flex flex-col  items-center md:items-stretch gap-10 w-full'>
                
                <aside className='flex flex-col md:min-h-screen my-1  gap-0 text-white border-white border'>
                    <input type='text' placeholder='>.config' className='text-black py-1 px-2 placeholder-black selection:text-white selection:bg-black'/>
                    <nav>
                        
                        <button 
                        onClick={()=>setPage('announcements')}
                        className={`px-2 py-1 border-white border w-full flex items-start hover:text-black hover:bg-white ${
                            page=='announcements'
                            ? 'bg-white text-black'
                            : 'bg-black text-white'
            
                        }`}>
                            announcements
                        </button>

                        <button 
                        onClick={()=>setPage('crc')}
                        className={`px-2 py-1 border-white border w-full flex items-start hover:text-black hover:bg-white ${
                            page=='crc'
                            ? 'bg-white text-black'
                            : 'bg-black text-white'
            
                        }`}>
                            about-crc
                        </button>

                        <button 
                        onClick={()=>setPage('presets')}
                        className={`px-2 py-1 border-white border w-full flex items-start hover:text-black hover:bg-white ${
                            page=='presets'
                            ? 'bg-white text-black'
                            : 'bg-black text-white'
            
                        }`}>
                            presets
                        </button>

                        <button 
                        onClick={()=>setPage('publish')}
                        className={`px-2 py-1 border-white border w-full flex items-start hover:text-black hover:bg-white ${
                            page=='publish'
                            ? 'bg-white text-black'
                            : 'bg-black text-white'
            
                        }`}>
                            publish-ledgers
                        </button>

                        <button 
                        onClick={()=>setPage('queries')}
                        className={`px-2 py-1 border-white border w-full flex items-start hover:text-black hover:bg-white ${
                            page=='queries'
                            ? 'bg-white text-black'
                            : 'bg-black text-white'
            
                        }`}>
                            queries
                        </button>
                        
                    </nav>
                </aside>

                <main className='flex min-w-0 w-full'>
                    {section[page]}
                </main>
            </div>
        </div>
    )
}