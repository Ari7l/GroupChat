import React from 'react'
import { useState } from 'react'
import { collection, query, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase';
import { onSnapshot } from 'firebase/firestore';
import { getDocs, getDoc } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchUser();
    }
  };
  const { currentUser } = useContext(AuthContext);
  const searchUser = async () => {
    setLoading(true);
    setError(null);
    const q = query(collection(db, "users"), where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }
  const handleSelect = async (user) => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });
      }
       
    }
    catch (err) {

      console.log(err);

    }
setUser(null);
setUsername("");
  }
  return (
    <div className='search'>
      <div className='searchForm'>
        <input type='text' placeholder='Find a user' onKeyDown={handleKeyDown} onChange={(e) => {
          setUsername(e.target.value);
        }}  value={username} />
      </div>
      {error && <span>{error}</span>}
      {user && <div className='userChat' onClick={() => {
        handleSelect(user);
      }}>
        <img src={user?.photoURL} alt="" />
        <div className='userChatInfo'>
          <span> {user?.displayName} </span>
        </div>
      </div>}
    </div>
  )
}

export default Search