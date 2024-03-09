import React from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const Navigate = useNavigate();
  const [err, setErr] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try{
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      Navigate("/");
    }catch(err){
      setErr(true);
      console.log(err);
    }
   
  }

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Group Chat</span>
            <span className = 'title'>Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
                <button>Sign in</button>
                {err && <span>Something went wrong</span>}
                <p>You don't have an account? <a href="/register">Register</a></p>
            </form>
        </div>
    </div>
  )
}

export default Login