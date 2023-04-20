import './App.css';
import Dashboard from './pages/dashboard';
import TableUI from './pages/tableUI';
import HeaderUI from './components/HeaderUI'
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <HeaderUI />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/invoices" element={<TableUI />} />
      </Routes>
    </div>
  );
}

export default App;
