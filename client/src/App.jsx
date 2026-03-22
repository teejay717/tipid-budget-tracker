import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Categories from './pages/Categories';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import ProtectedLayout from './components/ProtectedLayout';

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
              element={
                <PrivateRoute>
                  <ProtectedLayout />
                </PrivateRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
              <Route path="/categories" element={<Categories />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
