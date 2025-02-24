import './App.css'
import { NavLink } from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <NavLink to="/home" end>
          <h1>Home</h1>
        </NavLink>
      </div>
    </>
  )
}

export default App
