import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import Protected from './Protected'
import Chat1 from './pages/Chat1'


function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path="/chat" element={<Protected Component={Chat}/>}></Route>
                <Route path="/chatting" element={<Protected Component={Chat1}/>}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App