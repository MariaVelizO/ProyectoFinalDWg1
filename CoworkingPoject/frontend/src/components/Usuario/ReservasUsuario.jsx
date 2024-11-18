import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MisReservas() {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
    const [nuevosDatos, setNuevosDatos] = useState({
        fechaReserva: '',
        horaInicio: '',
        horaFin: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            alert('No se encontró información de usuario. Por favor, inicie sesión nuevamente.');
            return;
        }

        const obtenerReservas = async () => {
            setCargando(true);
            try {
                const response = await axios.get(`http://localhost:3001/api/usuario/reservas/usuario/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Reservas obtenidas:', response.data);
                
                if (response.data.length === 0) {
                    alert('No tienes reservas registradas.');
                }

                setReservas(response.data);
            } catch (error) {
                console.error('Error al obtener las reservas:', error);
                alert('No se pudieron obtener las reservas. Intente más tarde.');
            } finally {
                setCargando(false);
            }
        };

        obtenerReservas();
    }, []);

    const eliminarReserva = async (reservaId) => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('No se encontró información de usuario. Por favor, inicie sesión nuevamente.');
            return;
        }

        try {
            await axios.delete(`http://localhost:3001/api/usuario/reserva-cancelacion/${reservaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Reserva eliminada correctamente.');
            setReservas(reservas.filter(reserva => reserva._id !== reservaId));
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
            alert('No se pudo eliminar la reserva. Intente más tarde.');
        }
    };

    const mostrarFormularioModificacion = (reserva) => {
        setReservaSeleccionada(reserva);
        setNuevosDatos({
            fechaReserva: reserva.fechaReserva,
            horaInicio: reserva.horaInicio,
            horaFin: reserva.horaFin,
        });
    };

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setNuevosDatos((prevDatos) => ({
            ...prevDatos,
            [name]: value,
        }));
    };

    const manejarModificacion = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            alert('No se encontró información de usuario. Por favor, inicie sesión nuevamente.');
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:3001/api/usuario/reserva-modificacion/${reservaSeleccionada._id}`,
                nuevosDatos,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Reserva modificada correctamente.');
            setReservas(reservas.map((reserva) =>
                reserva._id === reservaSeleccionada._id ? response.data : reserva
            ));
            setReservaSeleccionada(null);
        } catch (error) {
            console.error('Error al modificar la reserva:', error);
            alert('No se pudo modificar la reserva. Intente más tarde.');
        }
    };

    return (
        <div>
            <h2>Mis Reservas</h2>

            {cargando ? (
                <p>Cargando reservas...</p>
            ) : (
                <div>
                    {reservas.length > 0 ? (
                        reservas.map((reserva) => (
                            <div
                                key={reserva._id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    border: '1px solid #ccc',
                                    padding: '15px',
                                    marginBottom: '15px',
                                    borderRadius: '10px',
                                }}
                            >
                                <div>
                                    <h3>Reserva en: {reserva.espacio.nombre}</h3>
                                    <p>Fecha: {reserva.fechaReserva}</p>
                                    <p>Hora de inicio: {reserva.horaInicio}</p>
                                    <p>Hora de fin: {reserva.horaFin}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => eliminarReserva(reserva._id)}
                                        style={{
                                            marginRight: '10px',
                                            padding: '5px 10px',
                                            backgroundColor: '#f44336',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => mostrarFormularioModificacion(reserva)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#4CAF50',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Modificar
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No tienes reservas registradas.</p>
                    )}
                </div>
            )}

            {/* Formulario de modificación */}
            {reservaSeleccionada && (
                <div>
                    <h3>Modificar Reserva</h3>
                    <form onSubmit={manejarModificacion}>
                        <div>
                            <label>Fecha:</label>
                            <input
                                type="text"
                                name="fechaReserva"
                                value={nuevosDatos.fechaReserva}
                                readOnly
                                style={{
                                    backgroundColor: '#f0f0f0',
                                    cursor: 'not-allowed',
                                }}
                            />
                        </div>
                        <div>
                            <label>Hora de inicio:</label>
                            <input
                                type="time"
                                name="horaInicio"
                                value={nuevosDatos.horaInicio}
                                onChange={manejarCambio}
                            />
                        </div>
                        <div>
                            <label>Hora de fin:</label>
                            <input
                                type="time"
                                name="horaFin"
                                value={nuevosDatos.horaFin}
                                onChange={manejarCambio}
                            />
                        </div>
                        <button type="submit">Guardar cambios</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default MisReservas;
