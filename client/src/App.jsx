import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Categories from './pages/Categories';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
          {/* public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* protected routes */}
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <div className="flex min-h-screen bg-gray-950">
                  <Sidebar />
                    <main className="flex-1 flex-col p-8">
                      <Dashboard />
                    </main>
                </div>
              </PrivateRoute>
            }/>

            <Route 
            path="/history" 
            element={
              <PrivateRoute>
                <div className="flex min-h-screen bg-gray-950">
                  <Sidebar />
                    <main className="flex-1 flex-col p-8">
                      <History />
                    </main>
                </div>
              </PrivateRoute>
            }/>

            <Route 
            path="/categories" 
            element={
              <PrivateRoute>
                <div className="flex min-h-screen bg-gray-950">
                  <Sidebar />
                    <main className="flex-1 flex-col p-8">
                      <Categories />
                    </main>
                </div>
              </PrivateRoute>
            }/>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
