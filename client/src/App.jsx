import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Categories from './pages/Categories';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-gray-950">
          <Sidebar />
          <main className="flex-1 p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
