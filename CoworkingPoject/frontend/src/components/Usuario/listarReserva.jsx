/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listarReserva.css';  

//function listarReserva() {
    const listarReserva = () => {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
    const [nuevosDatos, setNuevosDatos] = useState({
        fechaReserva: '',
        horaInicio: '',
        horaFin: '',
    });
    const [modificarVisible, setModificarVisible] = useState(false); // Estado para controlar la visibilidad del formulario

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
        setModificarVisible(true); // Mostrar el formulario de modificación
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
            setModificarVisible(false); // Ocultar el formulario después de la modificación
        } catch (error) {
            console.error('Error al modificar la reserva:', error);
            alert('No se pudo modificar la reserva. Intente más tarde.');
        }
    };

    const toggleFormularioModificacion = () => {
        setModificarVisible(!modificarVisible); // Alternar la visibilidad del formulario
    };

    return (
        <div className="mis-reservas">
            <h2>Mis Reservas</h2>

            {cargando ? (
                <p>Cargando reservas...</p>
            ) : (
                <div className="reservas-container">
                    {reservas.length > 0 ? (
                        reservas.map((reserva) => (
                            <div key={reserva._id} className="reserva-card">
                                <div className="reserva-details">
                                    <h3>Reserva en: {reserva.espacio.nombre}</h3>
                                    <p>Fecha: {reserva.fechaReserva}</p>
                                    <p>Hora de inicio: {reserva.horaInicio}</p>
                                    <p>Hora de fin: {reserva.horaFin}</p>
                                </div>

                                <div className="reserva-actions">
                                    <button
                                        onClick={() => mostrarFormularioModificacion(reserva)}
                                        className="button modificar-button"
                                    >
                                        Modificar
                                    </button>
                                    <button
                                        onClick={() => eliminarReserva(reserva._id)}
                                        className="button eliminar-button"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No tienes reservas registradas.</p>
                    )}
                </div>
            )}

            
            <button 
                className="button"
                onClick={toggleFormularioModificacion}
                style={{ marginTop: '20px', backgroundColor: '#19232D', color: 'white' }}
            >
                {modificarVisible ? 'Cerrar Formulario' : 'Mostrar Formulario'}
            </button>

           
            {modificarVisible && reservaSeleccionada && (
                <div className="modificar-reserva" style={{ 
                    position: 'fixed', 
                    top: '40%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    width: '450px', 
                    padding: '50px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    zIndex: '9999', 
                }}>
                    <h3 style={{ textAlign: 'center', fontSize: '32px', color: '#19232d' }}>Modificar Reserva</h3>
                    <form onSubmit={manejarModificacion}>
                    <div className="input-group">
                <label>Fecha:</label>
                      <input
                     type="text"
                 name="fechaReserva"
                    value={nuevosDatos.fechaReserva}
                 readOnly
                    className="readonly-input"
                            />
                        </div>
                        <div className="input-group">
                            <label>Hora de inicio:</label>
                            <input
                                type="time"
                                name="horaInicio"
                                value={nuevosDatos.horaInicio}
                                onChange={manejarCambio}
                            />
                        </div>
                        <div className="input-group">
                            <label>Hora de fin:</label>
                            <input
                                type="time"
                                name="horaFin"
                                value={nuevosDatos.horaFin}
                                onChange={manejarCambio}
                            />
                        </div>
                        <button type="submit" className="button guardar-button">Guardar cambios</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default listarReserva;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './listarReserva.css'; // Estilos CSS

const ListarReserva = () => {
    const [reservas, setReservas] = useState([]); // Lista de reservas
    const [cargando, setCargando] = useState(false); // Indicador de carga
    const [error, setError] = useState(null); // Manejo de errores
    const [titulo, setTitulo] = useState(""); // Título dinámico
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
    const [nuevosDatos, setNuevosDatos] = useState({
      fechaReserva: "",
      horaInicio: "",
      horaFin: "",
    });
  
    // Obtener reservas del usuario
    useEffect(() => {
      const fetchReservas = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
  
        if (!token || !userId) {
          setError("No estás autenticado. Por favor, inicia sesión nuevamente.");
          return;
        }
  
        setCargando(true);
        try {
          const response = await axios.get(
            `http://localhost:3001/api/usuario/reservas/usuario/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setReservas(response.data);
          setTitulo("Mis Reservas");
        } catch (err) {
          setError("Error al obtener reservas. Intenta más tarde.");
        } finally {
          setCargando(false);
        }
      };
  
      fetchReservas();
    }, []);
  
    // Eliminar una reserva
    const eliminarReserva = async (reservaId) => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        setError("No estás autenticado. Por favor, inicia sesión nuevamente.");
        return;
      }
  
      try {
        await axios.delete(
          `http://localhost:3001/api/usuario/reserva-cancelacion/${reservaId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReservas((prev) => prev.filter((reserva) => reserva._id !== reservaId));
        alert("Reserva eliminada correctamente.");
      } catch (err) {
        setError("Error al eliminar la reserva. Intenta más tarde.");
      }
    };
  
    // Mostrar formulario de modificación dentro del contenedor
    const mostrarFormularioModificacion = (reserva) => {
      if (reservaSeleccionada && reservaSeleccionada._id === reserva._id) {
        setReservaSeleccionada(null); // Si ya está expandido, colapsamos el formulario
      } else {
        setReservaSeleccionada(reserva); // Si no está expandido, lo seleccionamos
        setNuevosDatos({
          fechaReserva: reserva.fechaReserva,
          horaInicio: reserva.horaInicio,
          horaFin: reserva.horaFin,
        });
      }
    };
  
    // Manejar cambios en los campos del formulario
    const manejarCambio = (e) => {
      const { name, value } = e.target;
      setNuevosDatos((prev) => ({ ...prev, [name]: value }));
    };
  
    // Modificar una reserva
    const manejarModificacion = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
  
      if (!token) {
        setError("No estás autenticado. Por favor, inicia sesión nuevamente.");
        return;
      }
  
      try {
        const response = await axios.put(
          `http://localhost:3001/api/usuario/reserva-modificacion/${reservaSeleccionada._id}`,
          nuevosDatos,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReservas((prev) =>
          prev.map((reserva) =>
            reserva._id === reservaSeleccionada._id ? response.data : reserva
          )
        );
        alert("Reserva modificada correctamente.");
        setReservaSeleccionada(null); // Colapsamos el formulario después de la modificación
      } catch (err) {
        setError("Error al modificar la reserva. Intenta más tarde.");
      }
    };
  
    return (
      <div className="listarReserva">
        <h2>{titulo}</h2>
  
        {cargando && <p>Cargando reservas...</p>}
        {error && <p className="error">{error}</p>}
  
        <div className="reservasContainer">
          {reservas.length === 0 && !cargando && <p>No tienes reservas registradas.</p>}
  
          {reservas.map((reserva) => (
            <div key={reserva._id} className="reservaCard">
              <h3>Reserva en: {reserva.espacio.nombre}</h3>
              <p><strong>Fecha:</strong> {reserva.fechaReserva}</p>
              <p><strong>Hora Inicio:</strong> {reserva.horaInicio}</p>
              <p><strong>Hora Fin:</strong> {reserva.horaFin}</p>
              
              <div className="reservaActions">
                <button
                  onClick={() => mostrarFormularioModificacion(reserva)}
                  className="button modificar-button"
                >
                  {reservaSeleccionada && reservaSeleccionada._id === reserva._id
                    ? "Cancelar"
                    : "Modificar"}
                </button>
                <button
                  onClick={() => eliminarReserva(reserva._id)}
                  className="button eliminar-button"
                >
                  Eliminar
                </button>
              </div>
  
              {/* Mostrar el formulario de modificación si la reserva está seleccionada */}
              {reservaSeleccionada && reservaSeleccionada._id === reserva._id && (
                <div className="modificarFormulario">
                  <form onSubmit={manejarModificacion}>
                    <div>
                      <label>Fecha:</label>
                      <input
                        type="text"
                        name="fechaReserva"
                        value={nuevosDatos.fechaReserva}
                        readOnly
                      />
                    </div>
                    <div>
                      <label>Hora Inicio:</label>
                      <input
                        type="time"
                        name="horaInicio"
                        value={nuevosDatos.horaInicio}
                        onChange={manejarCambio}
                      />
                    </div>
                    <div>
                      <label>Hora Fin:</label>
                      <input
                        type="time"
                        name="horaFin"
                        value={nuevosDatos.horaFin}
                        onChange={manejarCambio}
                      />
                    </div>
                    <button type="submit" className="guardar-button">Guardar Cambios</button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ListarReserva;