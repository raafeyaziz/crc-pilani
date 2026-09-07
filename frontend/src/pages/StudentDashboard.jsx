import { useContext, useEffect, useState } from 'react';
import { AuthContext, api } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 

import logoutIcon from '../assets/logout.svg';
import moneyIcon from '../assets/money.svg';
import handIcon from '../assets/hand.svg';
import announcementIcon from '../assets/announcement.svg';
import Button from '../components/Button';
import Row from '../components/Row';
import Column from '../components/Column';
import MainButton from '../components/MainButton';

const CRCDashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate= useNavigate();
  const name= user.first_name.toLowerCase() + " "+user.last_name.toLowerCase()
  return (
    <div className="md:px-10 px-5 min-h-screen  bg-black text-white font-geist font-normal flex flex-col gap-2 relative selection:bg-white selection:text-black">
        <header className="">
          <div className="py-5  mx-auto flex items-center justify-between">
            <div className="text-2xl items-center md:text-3xl tracking-wide flex whitespace-nowrap z-10">
              &gt;crc.pilani 
            <span className="inline-block w-[0.5em] h-[1em] bg-white ml-1"></span>
            </div>
            <div className='flex gap-4'>
              <Button also='w-14 h-14' onClick={logout}>
                <img src={logoutIcon} className='group-hover:invert' alt='logout'/>
              </Button>
            </div>
  
          </div>
        </header>
        
        
          <Row className=' flex-col flex-1 p-10 gap-10 min-w-0'>
            <MainButton src={moneyIcon}
            onClick={()=>navigate('/main-menu', {state: 'ledgers'})}
            title='ledgers'
            body="leave your negativity at the door, thanks"/>

            <MainButton src={announcementIcon}
            onClick={()=>navigate('/main-menu', {state: 'announcements'})}
            title='announcements'
            body="the art of talking when nobody's listening"/>

            <MainButton src={handIcon}
            onClick={()=>navigate('/main-menu', {state: 'crc'})}
            title='about-crc'
            body="how many ORMs can you put them through?"/>

          </Row>
        
    </div>
  );
};
export default CRCDashboard;