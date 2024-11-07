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
    const [touched, setTouched] = useState({ nombre: false, apellido: false, telefono: false, email: false, password: false });
    const navigate = useNavigate(); // Para manejar la redirección

    // Validaciones
    const isNombreValid = /^[A-Z][a-z]+$/.test(nombre) && nombre.trim().length > 0;
    const isApellidoValid = /^[A-Z][a-z]+$/.test(apellido) && apellido.trim().length > 0;
    const isTelefonoValid = /^\d{8}$/.test(telefono); // Teléfono exactamente 8 dígitos
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    const isPasswordValid = password.length >= 6;
    
    const isFormValid = isNombreValid && isApellidoValid && isTelefonoValid && isEmailValid && isPasswordValid;

    const handleRegister = async (e) => {
        e.preventDefault();
        const newUser = { nombre, apellido, telefono, email, password };

        try {
            const response = await axios.post('http://localhost:3001/api/usuario/registerUser', newUser);
            alert('Usuario registrado con éxito');
            
            // Restablecer los campos a su estado inicial
            setNombre('');
            setApellido('');
            setTelefono('');
            setEmail('');
            setPassword('');
            setTouched({ nombre: false, apellido: false, telefono: false, email: false, password: false });  // Restablecer touched
            setError(null);
        } catch (err) {
            setError(err.response?.data || 'Error al registrar usuario');
        }
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
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
                className={touched.nombre && !isNombreValid ? "input-invalid" : isNombreValid ? "input-valid" : "input-black"}
                onBlur={() => handleBlur('nombre')}
                required
            />
            {touched.nombre && !isNombreValid && <p className="error-message">El nombre debe comenzar con mayúscula y no estar vacío.</p>}

            <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className={touched.apellido && !isApellidoValid ? "input-invalid" : isApellidoValid ? "input-valid" : "input-black"}
                onBlur={() => handleBlur('apellido')}
                required
            />
            {touched.apellido && !isApellidoValid && <p className="error-message">El apellido debe comenzar con mayúscula y no estar vacío.</p>}

            <input
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className={touched.telefono && !isTelefonoValid ? "input-invalid" : isTelefonoValid ? "input-valid" : "input-black"}
                onBlur={() => handleBlur('telefono')}
                required
            />
            {touched.telefono && !isTelefonoValid && <p className="error-message">El teléfono debe tener exactamente 8 dígitos.</p>}

            <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={touched.email && !isEmailValid ? "input-invalid" : isEmailValid ? "input-valid" : "input-black"}
                onBlur={() => handleBlur('email')}
                required
            />
            {touched.email && !isEmailValid && <p className="error-message">El correo debe ser un Gmail válido.</p>}

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={touched.password && !isPasswordValid ? "input-invalid" : isPasswordValid ? "input-valid" : "input-black"}
                onBlur={() => handleBlur('password')}
                required
            />
            {touched.password && !isPasswordValid && <p className="error-message">La contraseña debe tener al menos 6 caracteres.</p>}

            <button type="submit" disabled={!isFormValid}>Sign up</button>
            <a href="#" onClick={goToLogin}>Already have an account? Sign In</a>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

export default Register;