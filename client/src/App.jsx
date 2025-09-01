import './App.css'
import logo from '/logo.png'
import DataTable from './components/table'

function App() {

  return (
    <div className='pageContainer'>
      <img src={logo} className="logo" alt="CarbonSustain logo" />
      <DataTable />
    </div>
  )
}

export default App
