import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsAuthenticated, setIsSignUpActive, setRole }) {
    const [emailIngreso, setEmailIngreso] = useState('');
    const [passwordIngreso, setPasswordIngreso] = useState('');
    const [error, setError] = useState(null);
    const [touched, setTouched] = useState({ emailIngreso: false, passwordIngreso: false });
    const navigate = useNavigate(); // Para manejar la redirección

    // Validaciones
    const isEmailIngresoValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailIngreso);
    const isPasswordIngresoValid = passwordIngreso.length >= 6;
    const isLoginValid = isEmailIngresoValid && isPasswordIngresoValid;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/usuario/user-login', { 
                email: emailIngreso, 
                password: passwordIngreso 
            });

            // Guardar el token en localStorage
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user.id);  // Guardamos el ID
            localStorage.setItem('userEmail', emailIngreso); // Guardamos el correo
            localStorage.setItem('role', user.role); // Guardamos el rol del usuario
            console.log('Token, ID y correo almacenados:', token, user.id, emailIngreso, user.role);
            console.log('Rol almacenado en localStorage:', localStorage.getItem('role'));

            alert('Inicio de sesión exitoso');
            setIsAuthenticated(true);  // Cambia el estado de autenticación
            setRole(user.role);  // Asumimos que el API devuelve un campo 'role' en el objeto 'user'
            navigate(user.role === 'admin' ? '/adminpanel' : '/userpanel');  // Redirige según el rol
        } catch (err) {
            setError(err.response?.data || 'Error en el inicio de sesión');
            console.error("Error al iniciar sesión:", err);
        }
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
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
                value={emailIngreso}
                onChange={(e) => setEmailIngreso(e.target.value)}
                className={touched.emailIngreso && !isEmailIngresoValid ? "input-invalid" : isEmailIngresoValid ? "input-valid" : "input-black"}
                onBlur={() => handleBlur('emailIngreso')}
                required
            />
            {touched.emailIngreso && !isEmailIngresoValid && <p className="error-message">El correo debe ser un Gmail válido.</p>}

            <input
                type="password"
                placeholder="Contraseña"
                value={passwordIngreso}
                onChange={(e) => setPasswordIngreso(e.target.value)}
                className={touched.passwordIngreso && !isPasswordIngresoValid ? "input-invalid" : isPasswordIngresoValid ? "input-valid" : "input-black"}
                onBlur={() => handleBlur('passwordIngreso')}
                required
            />
            {touched.passwordIngreso && !isPasswordIngresoValid && <p className="error-message">La contraseña debe tener al menos 6 caracteres.</p>}

            <button type="submit" className="mostrar-boton" disabled={!isLoginValid}>
                Sign in
            </button>
            <a href="#" onClick={goToRegister}>Don't have an account? Sign Up</a>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

export default Login;
