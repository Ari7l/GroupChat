import React from 'react'


function Login() {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Group Chat</span>
            <span className = 'title'>Login</span>
            <form action="">
                <input type="email" placeholder='email' />
                <input type="password" placeholder='password' />
                <button>Sign in</button>
                <p>You don't have an account? Register</p>
            </form>
        </div>
    </div>
  )
}

export default Login