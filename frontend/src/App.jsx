import { Routes, Route } from 'react-router-dom';
import Auth from './pages/auth.jsx';
import FinanceTracker from './pages/financetracker.jsx';
import PageNotFound from './components/shared/PageNotFound.jsx'
import Header from './components/shared/Header.jsx' 
import { useAuth } from './context/AuthContext.jsx';
// import PrivateRoutes from './utils/PrivateRoutes.jsx';

function App() {   
  const auth = useAuth();
  return (
    <>
      <Header />
      <Routes> 
        {/* <Route element={<PrivateRoutes />}>
          <Route element={<FinanceTracker />} path="/financetracker"/>
        </Route> */}
        <Route path="/" element={<Auth />} />
        {auth.islogin && <Route path="/financetracker" element={<FinanceTracker />} />}
        <Route path="*" element={<PageNotFound />} /> 
      </Routes>
    </>
  )
}

export default App
