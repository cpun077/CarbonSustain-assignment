import './App.css'
import logo from '/logo.png'
import Grid from './components/table'

function App() {

  return (
    <div className='pageContainer'>
      <img src={logo} className="logo" alt="CarbonSustain logo" />
      <strong>Action Log</strong>
      <div className='actionContainer'>
        <Grid />
      </div>
    </div>
  )
}

export default App
