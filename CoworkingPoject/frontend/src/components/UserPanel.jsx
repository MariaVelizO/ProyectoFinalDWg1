import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserPanel() {
    const [fechaReserva, setFechaReserva] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [espaciosDisponibles, setEspaciosDisponibles] = useState([]);
    const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();

    const verificarDisponibilidad = async () => {
        if (!fechaReserva || !horaInicio || !horaFin) {
            alert('Por favor, complete todos los campos antes de verificar.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('No se encontró un token de autenticación. Por favor, inicie sesión nuevamente.');
            return;
        }

        setCargando(true);
        try {
            const url = `http://localhost:3001/api/usuario/espacios?fechaReserva=${fechaReserva}&horaInicio=${horaInicio}&horaFin=${horaFin}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEspaciosDisponibles(response.data);

            if (response.data.length === 0) {
                alert('No se encontraron espacios disponibles en el horario seleccionado.');
            }
        } catch (error) {
            console.error('Error al verificar disponibilidad:', error);
            alert('No se pudieron obtener los espacios disponibles. Intente más tarde.');
        } finally {
            setCargando(false);
        }
    };

    const confirmarReserva = async () => {
        if (!espacioSeleccionado) {
            alert('Por favor, seleccione un espacio para reservar.');
            return;
        }

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const userEmail = localStorage.getItem('userEmail');

        if (!token || !userId || !userEmail) {
            alert('No se encontró información de usuario. Por favor, inicie sesión nuevamente.');
            return;
        }

        const reservaData = {
            espacioId: espacioSeleccionado._id,
            usuarioId: userId,
            fechaReserva,
            horaInicio,
            horaFin,
            usuarioEmail: userEmail,
        };

        try {
            setCargando(true);
            const response = await axios.post('http://localhost:3001/api/usuario/reserva', reservaData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.mensaje === 'Reserva creada exitosamente') {
                alert('Reserva creada exitosamente');
            } else {
                alert('Hubo un error al crear la reserva.');
            }
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            alert('No se pudo crear la reserva. Intente más tarde.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div>
            <h2>Reserva de Espacios</h2>

            {/* Fecha y Hora */}
            <label>
                Elija la fecha de reserva:
                <input
                    type="date"
                    value={fechaReserva}
                    onChange={(e) => setFechaReserva(e.target.value)}
                />
            </label>

            <label>
                Hora de inicio:
                <input
                    type="time"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                />
            </label>

            <label>
                Hora de fin:
                <input
                    type="time"
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)}
                />
            </label>

            <button onClick={verificarDisponibilidad} disabled={cargando}>
                {cargando ? 'Verificando disponibilidad...' : 'Verificar Disponibilidad'}
            </button>

            {/* Lista de espacios disponibles */}
            <div>
                <h3>Espacios Disponibles</h3>
                {espaciosDisponibles.length > 0 ? (
                    espaciosDisponibles.map((espacio) => (
                        <div key={espacio._id}>
                            <h4>{espacio.nombre}</h4>
                            <button onClick={() => setEspacioSeleccionado(espacio)}>Seleccionar Espacio</button>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron espacios disponibles.</p>
                )}
            </div>

            {/* Confirmar reserva del espacio seleccionado */}
            {espacioSeleccionado && (
                <div>
                    <h3>Detalles de la Reserva</h3>
                    <p>Espacio seleccionado: {espacioSeleccionado.nombre}</p>
                    <p>Fecha de reserva: {fechaReserva}</p>
                    <p>Hora de inicio: {horaInicio}</p>
                    <p>Hora de fin: {horaFin}</p>

                    <button onClick={confirmarReserva} disabled={cargando}>
                        {cargando ? 'Confirmando reserva...' : 'Confirmar Reserva'}
                    </button>
                </div>
            )}

            {/* Botón para navegar a Mis Reservas no funcional*/}
            <button onClick={() => (window.location.href = '/mis-reservas')}>
            Ver Mis Reservas
            </button>
        </div>
    );
}

export default UserPanel;
