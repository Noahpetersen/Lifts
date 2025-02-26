import './App.css'
import { Route, Routes} from 'react-router-dom'
import ProtectedRoute from '../routes/ProtectedRoute';
import Home from './Pages/Home';
import SignUp from './Pages/Signup';
import SignIn from './Pages/Signin';
import CreateSession from './Pages/CreateSession';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/create" element={<ProtectedRoute><CreateSession/></ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App
