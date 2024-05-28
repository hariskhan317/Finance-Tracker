import { Routes, Route } from 'react-router-dom';
import Auth from './pages/auth.jsx';
import FinanceTracker from './pages/financetracker.jsx';
import PageNotFound from './components/shared/PageNotFound.jsx'
import Header from './components/shared/Header.jsx' 
import { useAuth } from './context/AuthContext.jsx'; 

function App() {   
  const auth = useAuth();
  return (
    <>
      <Header />
      <Routes>  
 
        <Route path="/" element={<Auth />} />  
        {auth.isUser && auth.islogin && <Route path="/financetracker" element={<FinanceTracker />} />} 
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
