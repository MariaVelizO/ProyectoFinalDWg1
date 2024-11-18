// Home.js
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './Home.css';

function Home({ role }) {
  // Redirigir al panel correspondiente según el rol
  useEffect(() => {
    if (role === 'admin') {
      // Redirigir al panel de administrador
      return <Navigate to="/adminpanel" replace />;
    } else if (role === 'user') {
      // Redirigir al panel de usuario
      return <Navigate to="/userpanel" replace />;
    }
  }, [role]);

  return (
    <div>
      <h1 className='bienvenida'>Welcome to CoLab Studio</h1>
      { <img src="/homeA.png" alt="Home" />}
      <p>   Un espacio pensado para lo que más importa: tu creatividad, tu trabajo y tu futuro</p>
    </div>
  );
}

export default Home;
