import { useGoogleLogin } from '@react-oauth/google';
import { useContext, useEffect } from 'react';            
import { useNavigate } from 'react-router-dom';             
import { AuthContext } from '../context/AuthContext'; 

import Button from '../components/Button.jsx'
import googleIcon from '../assets/google_icon.svg';
import dollarBg from '../assets/dollar_sign.svg';

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
  }, [user, loading, navigate]); // This runs anytime the user state changes
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      loginWithGoogle(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  return (
    // min-w-[1200px] ensures the layout never squishes; it just crops via overflow-hidden
    <div className="h-screen w-screen min-w-full bg-black text-white font-geist font-normal relative overflow-hidden selection:bg-white selection:text-black">
      
      {/* 2. CUSTOM DOLLAR ASSET */}
      <img 
        src={dollarBg} 
        alt="Decorative Dollar Asset" 
        className="absolute grayscale left-1/2 top-1/2 -translate-y-1/2  h-[1000px] opacity-100 pointer-events-none select-none object-cover"
      />

      {/* 3. TOP left ALIGNMENT */}
      <div className="absolute top-5 left-10 text-3xl tracking-wide flex items-bottom whitespace-nowrap z-10">
        &gt;crc.pilani 
        <span className="inline-block w-[0.5em] h-[1em] bg-white ml-1"></span>
      </div>

      {/* 4. DEAD CENTER ALIGNMENT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-8 z-10">
        
        {/* The Text with the White Rectangle Behind It */}
        <div className=" px-6 py-2 text-3xl tracking-widest whitespace-nowrap">
          &gt;where does <span  className='selection:text-white selection:bg-black ring-2 ring-inset ring-black text-black bg-white px-1 py-1'> the ₹ go?</span>
        </div>

        {/* The Centered Brutalist Button */}
        <Button size='big' shape='rectangle'
          onClick={() => login()}
          
        >
          {/* The CSS Filter Trick for the Google Icon */}
          <img 
            src={googleIcon} 
            alt="Google" 
            className="w-[1.2em] h-[1.2em] grayscale brightness-0 invert group-hover:invert-0 transition-all duration-200" 
          />

          <span className=' leading-none tracking-widest lowercase'>sign_in</span>
          
        </Button>

      </div>

      {/* 5. BOTTOM CENTER ALIGNMENT */}
      <div className="absolute bg-black text-grey bottom-0 py-5 left-1/2 -translate-x-1/2 text-sm opacity-100 tracking-widest whitespace-nowrap z-10">
        <p>
          //the misfortune is <span className="text-white underline underline-offset-4 decoration-2"><a href='https://www.instagram.com/raafeyaziz'>raafey</a></span>'s
        </p>
      </div>

    </div>
  );
};

export default Login;