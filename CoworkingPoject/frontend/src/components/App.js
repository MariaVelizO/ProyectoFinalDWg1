import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'; 
import Navbar from './Navbar'; 
import Login from './Login'; 
import Register from './Register'; 
import Home from './Home'; 
import AdminPanel from './AdminPanel'; 
import UserPanel from './UserPanel'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [isSignUpActive, setIsSignUpActive] = useState(false); // Estado para manejar el panel activo
  const [role, setRole] = useState(''); // Estado para almacenar el rol del usuario

  // Componente para proteger rutas por rol
  const ProtectedRoute = ({ roleRequired, children }) => {
    return isAuthenticated && role === roleRequired ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      {isAuthenticated && <Navbar role={role} setIsAuthenticated={setIsAuthenticated} />} {/* Incluimos Navbar */}
      
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Login y Register */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
                <div className="App">
                  <div className={`form-container sign-up-container ${isSignUpActive ? 'active' : ''}`}>
                    <Register setIsSignUpActive={setIsSignUpActive} />
                  </div>
                  <div className={`form-container sign-in-container ${!isSignUpActive ? 'active' : ''}`}>
                    <Login 
                      setIsAuthenticated={setIsAuthenticated} 
                      setIsSignUpActive={setIsSignUpActive} 
                      setRole={setRole} 
                    />
                  </div>
                  <div className="overlay-container">
                    <div className="overlay">
                      <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button 
                          className="ghost" 
                          id="signIn" 
                          onClick={() => setIsSignUpActive(false)}
                        >
                          Sign In
                        </button>
                      </div>
                      <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start your journey with us</p>
                        <button 
                          className="ghost" 
                          id="signUp" 
                          onClick={() => setIsSignUpActive(true)}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        />
        
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
        
        {/* Panel de Usuario */}
        <Route 
          path="/userpanel" 
          element={
            <ProtectedRoute roleRequired="user">
              <UserPanel />
            </ProtectedRoute>
          } 
        />
        
        {/* Panel de Administrador */}
        <Route 
          path="/adminpanel" 
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
