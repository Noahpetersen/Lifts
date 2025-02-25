import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import Home from './Pages/Home.tsx'
import SignUp from './Pages/Signup.tsx'
import SignIn from './Pages/Signin.tsx'
import AuthProvider from '../contexts/AuthContext.tsx'
import ProtectedRoute from '../routes/ProtectedRoute.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute><App/></ProtectedRoute>}/>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)
