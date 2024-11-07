import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register({ setIsSignUpActive }) {
    const [nombre, setNombre] = useState(''); 
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Para manejar la redirección

    const handleRegister = async (e) => {
        e.preventDefault();
        const newUser = {
            nombre,
            apellido,
            telefono,
            email,
            password
        };

        try {
            const response = await axios.post('http://localhost:3001/api/usuario/registerUser', newUser);
            alert('Usuario registrado con éxito');
            setNombre('');
            setApellido('');
            setTelefono('');
            setEmail('');
            setPassword('');
            setError(null);
        } catch (err) {
            setError(err.response?.data || 'Error al registrar usuario');
        }
    };

    const goToLogin = () => {
        navigate('/login');  // Redirige a la página de login
        setIsSignUpActive(false); // Desactiva el panel de registro
    };

    return (
        <form onSubmit={handleRegister}>
            <h1 className="titulo">Sign up</h1>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
            />
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
            <button type="submit">Sign up</button>
            <a href="#" onClick={goToLogin}>Already have an account? Sign In</a>
            {error && <p className="error-mensaje">Error: {error}</p>}
        </form>
    );
}

export default Register;
