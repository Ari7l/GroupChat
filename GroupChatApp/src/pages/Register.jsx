import React from 'react'
import Add from '../img/addAvatar.png'
import { auth, storage, db } from '../firebase';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref } from 'firebase/storage';
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from 'react-router-dom';


function Register() {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      const user = res.user;
      const uploadSnapshot = await uploadTask; // waits for upload completion
      const downloadURL = await getDownloadURL(uploadSnapshot.ref);

      await updateProfile(user, {
        displayName,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "userChats", user.uid), {});
      // console.log(user);
      navigate("/");


    }
    catch (err) {
      setErr(true)
      console.log(err);
    }


  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Group Chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='display name' />
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password' />
          <input type="file" id='file' style={{ display: 'none' }} />
          <label htmlFor='file'>
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something went wrong</span>}
          <p>You do have an account? <a href='/login'>Login</a></p>
        </form>
      </div>
    </div>
  )
}

export default Register