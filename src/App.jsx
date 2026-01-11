//import { useState } from 'react'
import './index.css'
import NavBar from './components/NavBar'
import Forecast from "./components/Forecast"
function App() {

  return (
    <div class="px-16 py-8">
      <NavBar/>
      <div className="flex flex-col justify-center items-center">
      <h1 className="text-stone-50 text-3xl font-bold mb-10 mt-10">How's the sky looking today?</h1>
      <Forecast/>
   
    </div>
    </div>
  )
}

export default App
