import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'




const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className='logo'>Group Chat</span>
      <div className='user'>
        <img src={currentUser.photoURL} alt='' />
        <span> {currentUser.displayName} </span>
        <button className='logout' onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar