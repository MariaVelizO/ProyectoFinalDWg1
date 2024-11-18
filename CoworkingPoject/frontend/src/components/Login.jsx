import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsAuthenticated, setIsSignUpActive }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Para manejar la redirección

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/usuario/user-login', {
                email,
                password,
            });

            // Guardar el token en localStorage
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user.id);  // Guardamos el ID
            localStorage.setItem('userEmail', email); // Guardamos el correo
            console.log('Token, ID y correo almacenados:', token, user.id, email);

            alert('Inicio de sesión exitoso');
            setIsAuthenticated(true);  // Cambia el estado de autenticación
            navigate('/home');  // Redirige al Home
        } catch (err) {
            setError(err.response?.data || 'Error en el inicio de sesión');
            console.error("Error al iniciar sesión:", err);
        }
    };

    const goToRegister = () => {
        navigate('/register');  // Redirige a la página de registro
        setIsSignUpActive(true); // Activa el panel de registro
    };

    return (
        <form onSubmit={handleLogin}>
            <h1 className="titulo">Sign in</h1>
            <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign in</button>
            <a href="#" onClick={goToRegister}>Don't have an account? Sign Up</a>
            {error && <p className="error-mensaje">Error: {error}</p>}
        </form>
    );
}

export default Login;
