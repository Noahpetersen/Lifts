import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.tsx'
import AuthProvider from '../contexts/AuthContext.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
