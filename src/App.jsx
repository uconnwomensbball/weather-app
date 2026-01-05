//import { useState } from 'react'
import './index.css'
import NavBar from './components/NavBar'
import Forecast from "./components/Forecast"
function App() {

  return (
    <div>
      <NavBar/>
      <div className="flex flex-col justify-center items-center">
      <h1 className="text-slate-100">How's the sky looking today?</h1>
      <Forecast/>
      </div>
    </div>
  )
}

export default App
