import { useState } from 'react'
import './App.css'
import logo from '/logo.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='pageContainer'>
      <img src={logo} className="logo" alt="CarbonSustain logo" />
      <strong>Action Log</strong>
      <div className='actionContainer'>
        
      </div>
    </div>
  )
}

export default App
