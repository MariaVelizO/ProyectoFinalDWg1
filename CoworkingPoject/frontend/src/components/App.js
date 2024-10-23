import { useState } from 'react';
import axios from 'axios';
import './Design.css'; 

function App() {
    const [nombre, setNombre] = useState(''); // Estado para el nombre
    const [apellido, setApellido] = useState(''); // Estado para el apellido
    const [telefono, setTelefono] = useState(''); // Estado para el teléfono
    const [email, setEmail] = useState(''); // Estado para el correo electrónico
    const [password, setPassword] = useState(''); // Estado para la contraseña
    const [usuarios, setUsuarios] = useState([]); // Estado para guardar los usuarios
    const [error, setError] = useState(null); // Estado para manejar errores
    const [token, setToken] = useState(''); // Estado para guardar el token
    const [isSignUpActive, setIsSignUpActive] = useState(true); // Estado para manejar el panel activo

    // Función para realizar el inicio de sesión

    const handleLogin = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    try {
        const response = await axios.post('http://localhost:3001/api/usuario/login', {
       
             email,
            password,
        });
        setToken(response.data); // Guarda el token en el estado
        setError(null); // Reinicia el error
        alert('Inicio de sesión exitoso'); 
        console.log("Token:", response.data); // Muestra el token en la consola
    } catch (err) {
        setError(err.response?.data || 'Error en el inicio de sesión');
        console.error("Error al iniciar sesión:", err);
    }
};

    // Función para realizar el registro de usuario
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
            const response = await axios.post('http://localhost:3001/api/usuario/registroUsuario', newUser);
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

    return (
        <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
            <div className='form-container sign-up-container'>
                <h1 className="titulo">Create Account</h1>
                <form onSubmit={handleRegister}>
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
                        type="tel"
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
                    <button type="submit" className="mostrar-boton">Sign Up</button>
                </form>

                {error && <p className="error-mensaje">Error: {error}</p>}
            </div>

            <div className='form-container sign-in-container'>
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
                    <a href=''>Forgot your password?</a>
                    
                </form>
                {error && <p className="error-mensaje">Error: {error}</p>}
            </div>

            <div className='overlay-container'>
                <div className='overlay'>
                    <div className='overlay-panel overlay-left'>
                        <h1>Welcome Back!</h1>
                        <p>
                            To keep connected with us please login with your personal info
                        </p>
                        <button className='ghost' id='signIn' onClick={() => setIsSignUpActive(false)}>
                            Sign In
                        </button>
                    </div>
                    <div className='overlay-panel overlay-right'>
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start your journey with us</p>
                        <button className='ghost' id='signUp' onClick={() => setIsSignUpActive(true)}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
