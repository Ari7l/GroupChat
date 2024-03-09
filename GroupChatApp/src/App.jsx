import { useState } from 'react'
import './styles.scss'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const {currentUser} = useContext(AuthContext)

  // if(currentUser){
  //   return <Navigate to="/" />
  // }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ currentUser ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
