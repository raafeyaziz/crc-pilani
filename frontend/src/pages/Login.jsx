import { useGoogleLogin } from '@react-oauth/google';
import { useContext, useEffect } from 'react';            
import { useNavigate } from 'react-router-dom';             
import { AuthContext } from '../context/AuthContext'; 

import Button from '../components/Button.jsx'
import googleIcon from '../assets/google_icon.svg';
import loginIcon from '../assets/login.svg';
import dollarBg from '../assets/dollar_sign.svg';
import bg from '../assets/bg.svg';
import helpIcon from "../assets/help.svg";

const Login = () => {
  const { loginWithGoogle, user, loading } = useContext(AuthContext); 
  const navigate = useNavigate()
  useEffect(() => {
    // If the Context is done loading and confirms a user exists...
    if (!loading && user) {
      // Instantly warp them to their respective dashboard
      if (user.is_staff) {
        navigate('/crc-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    }
  }, [user, loading, navigate]);
  
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      loginWithGoogle(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  return (
    // min-w-[1200px] ensures the layout never squishes; it just crops via overflow-hidden
    /*<div className="h-screen w-screen min-w-full bg-black text-white font-geist font-normal relative overflow-hidden selection:bg-white selection:text-black">
      
      
      <img 
        src={dollarBg} 
        alt="Decorative Dollar Asset" 
        className="absolute grayscale left-1/2 top-1/2 -translate-y-1/2  h-[1000px] opacity-100 pointer-events-none select-none object-cover"
      />

      
      <div className="absolute top-5 left-10 text-3xl tracking-wide flex items-bottom whitespace-nowrap z-10">
        &gt;crc.pilani 
        <span className="inline-block w-[0.5em] h-[1em] bg-white ml-1"></span>
      </div>

      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-8 z-10">
        
        
        <div className=" px-6 py-2 text-3xl tracking-widest whitespace-nowrap">
          &gt;where does <span  className='selection:text-white selection:bg-black ring-2 ring-inset ring-black text-black bg-white px-1 py-1'> the ₹ go?</span>
        </div>

        
        <Button size='big' shape='rectangle'
          onClick={() => login()}
          
        >
          
          <img 
            src={googleIcon} 
            alt="Google" 
            className="w-[1.2em] h-[1.2em] grayscale brightness-0 invert group-hover:invert-0 transition-all duration-200" 
          />

          <span className=' leading-none tracking-widest lowercase'>sign_in</span>
          
        </Button>

      </div>

      
      <div className="absolute bg-black text-grey bottom-0 py-5 left-1/2 -translate-x-1/2 text-sm opacity-100 tracking-widest whitespace-nowrap z-10">
        <p>
          //the misfortune is <span className="text-white underline underline-offset-4 decoration-2"><a href='https://www.instagram.com/raafeyaziz'>raafey</a></span>'s
        </p>
      </div>

    </div>*/
    <div className="px-5 pb-1 md:h-screen md:px-10 overflow-hidden min-h-screen  bg-black text-white font-geist font-normal flex flex-col gap-2 relative selection:bg-white selection:text-black">
      <header className="border-b flex w-full">
        <div className="md:py-5 w-full py-3 mx-auto flex items-center justify-between">
          <div className="text-2xl items-center md:text-3xl tracking-wide flex whitespace-nowrap z-10">
            &gt;crc.pilani 
          <span className="inline-block w-[0.5em] h-[1em] bg-white ml-1"></span>
          
          
          </div>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=crc@pilani.bits-pilani.ac.in"
          target="_blank"
          rel="noopener noreferrer">
          <Button >
            <img src={helpIcon} alt='help' className='group-hover:invert'/>
          </Button>
          </a>
          
          

        </div>
      </header>
      <div className='flex flex-1 items-center justify-start md:overflow-hidden md:flex-row flex-col gap-4'>
        <div className='flex md:w-1/2 justify-center items-center'>
          <img src={bg} alt='cool-image' className=' hover:grayscale flex'></img>
        </div>
        <div className='flex-1 flex justify-center'>
        <div className='flex flex-col gap-4 w-fit justify-start md:items-center md:justify-center'>
          <div className=" px-6 py-2 text-grey text-xl flex items-center justify-center md:text-3xl  whitespace-nowrap">
              where does  the ₹ go?
          </div>

          <Button size='big' shape='rectangle' also='w-full' onClick={() => login()}>
            
            <img src={googleIcon} alt="Google" className="md:w-[2.25rem] w-[1.75rem] h-auto grayscale brightness-0 invert group-hover:invert-0 transition-all duration-200" />
            <span className=' leading-none lowercase'>sign in</span>
            
          </Button>
          
        </div>
        
        </div>

      </div>
    </div>

  );
};

export default Login;