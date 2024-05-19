import { Routes, Route } from 'react-router-dom';
import Auth from './pages/auth.jsx';
import FinanceTracker from './pages/financetracker.jsx';
import Header from './components/Header.jsx' 
import PrivateRoutes from './utils/PrivateRoutes.jsx';

function App() {   
  return (
    <>
      <Header />
      <Routes> 
        <Route element={<PrivateRoutes />}>
          <Route element={<FinanceTracker />} path="/financetracker"/>
        </Route>
        <Route path="/" element={<Auth />} />
      </Routes>
    </>
  )
}

export default App
