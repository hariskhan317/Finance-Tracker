import { Routes, Route } from 'react-router-dom';
import Auth from './pages/auth.jsx';
import FinanceTracker from './pages/financetracker.jsx';
import Header from './components/header.jsx'

function App() { 

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/Financetracker" element={<FinanceTracker />} />
      </Routes>
    </>
  )
}

export default App
