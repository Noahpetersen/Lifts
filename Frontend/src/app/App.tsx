import './App.css'
import { Route, Routes} from 'react-router-dom'
import ProtectedRoute from '../routes/ProtectedRoute';
import Home from './Pages/Home';
import SignUp from './Pages/Signup';
import SignIn from './Pages/Signin';
import CreateSession from './Pages/CreateSession';
import { Toaster } from '@/components/ui/sonner';
import SessionDetail from './Pages/SessionDetail';
import Congratulations from './Pages/Congratulations';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/create" element={<ProtectedRoute><CreateSession/></ProtectedRoute>}/>
        <Route path="/session/:sessionId" element={<ProtectedRoute><SessionDetail /></ProtectedRoute>} />
        <Route path="/completed" element={<ProtectedRoute><Congratulations /></ProtectedRoute>} />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
