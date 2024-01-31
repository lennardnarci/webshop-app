import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />}>

        </Route>
      </Routes>
    </>
  )
}

export default App
