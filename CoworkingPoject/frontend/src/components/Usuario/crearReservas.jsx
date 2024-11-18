/*import React, { useState } from 'react';
import './crearReserva.css'; 
import axios from 'axios';

//function crearReservas() {
    const crearReservas = () => {
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

    // Función para cancelar y redirigir al UserPanel
    const cancelarReserva = () => {
        window.location.href = 'http://localhost:3000/home'; 
    };

    return (
        <div className="user-panel">
            <h2 className="title">Reserva de Espacios</h2>

            <div className="fecha-hora-container">
                <label>Elija la fecha de reserva:
                    <input
                        type="date"
                        value={fechaReserva}
                        onChange={(e) => setFechaReserva(e.target.value)}
                    />
                </label>

                <label>Hora de inicio:
                    <input
                        type="time"
                        value={horaInicio}
                        onChange={(e) => setHoraInicio(e.target.value)}
                    />
                </label>

                <label>Hora de fin:
                    <input
                        type="time"
                        value={horaFin}
                        onChange={(e) => setHoraFin(e.target.value)}
                    />
                </label>
            </div>

            <button onClick={verificarDisponibilidad} disabled={cargando} className="button">
                {cargando ? 'Verificando disponibilidad...' : 'Verificar Disponibilidad'}
            </button>

            <div className="espacios-disponibles">
                <h3 className="espacios-title">Espacios Disponibles</h3>
                {espaciosDisponibles.length > 0 ? (
                    espaciosDisponibles.map((espacio) => (
                        <div key={espacio._id} className={`espacio-card ${espacioSeleccionado && espacioSeleccionado._id === espacio._id ? 'expanded' : ''}`}>
                            <h4>{espacio.nombre}</h4>
                            <button className="button seleccionar-button" onClick={() => setEspacioSeleccionado(espacio)}>
                                Seleccionar Espacio
                            </button>

                            {espacioSeleccionado && espacioSeleccionado._id === espacio._id && (
                                <div className="reserva-details">
                                    <h3>Detalles de la Reserva</h3>
                                    <p>Espacio seleccionado: {espacioSeleccionado.nombre}</p>
                                    <p>Fecha de reserva: {fechaReserva}</p>
                                    <p>Hora de inicio: {horaInicio}</p>
                                    <p>Hora de fin: {horaFin}</p>
                                    <button onClick={confirmarReserva} disabled={cargando} className="button confirm-button">
                                        {cargando ? 'Confirmando reserva...' : 'Confirmar Reserva'}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-espacios">No se encontraron espacios disponibles.</p>
                )}
            </div>

            <button onClick={cancelarReserva} className="button cancelar-button">
                Cancelar
            </button>

            <button onClick={() => (window.location.href = '/home')} className="button">
                Ver Mis Reservas
            </button>
        </div>
    );
}

export default crearReservas;*/

import React, { useState } from "react";
import "./crearReserva.css";
import axios from "axios";

const CrearReserva = () => {
    const [formData, setFormData] = useState({
      fechaReserva: "",
      horaInicio: "",
      horaFin: "",
      espacioSeleccionado: null,
    });
  
    const [espaciosDisponibles, setEspaciosDisponibles] = useState([]);
    const [cargando, setCargando] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const verificarDisponibilidad = async () => {
      const { fechaReserva, horaInicio, horaFin } = formData;
  
      if (!fechaReserva || !horaInicio || !horaFin) {
        alert("Por favor, completa todos los campos antes de verificar.");
        return;
      }
  
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No se encontró un token de autenticación. Por favor, inicia sesión nuevamente.");
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
          alert("No se encontraron espacios disponibles en el horario seleccionado.");
        }
      } catch (error) {
        console.error("Error al verificar disponibilidad:", error);
        alert("No se pudieron obtener los espacios disponibles. Intenta más tarde.");
      } finally {
        setCargando(false);
      }
    };
  
    const confirmarReserva = async () => {
      const { espacioSeleccionado, fechaReserva, horaInicio, horaFin } = formData;
  
      if (!espacioSeleccionado) {
        alert("Por favor, selecciona un espacio para reservar.");
        return;
      }
  
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const userEmail = localStorage.getItem("userEmail");
  
      if (!token || !userId || !userEmail) {
        alert("No se encontró información de usuario. Por favor, inicia sesión nuevamente.");
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
        const response = await axios.post("http://localhost:3001/api/usuario/reserva", reservaData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.data.mensaje === "Reserva creada exitosamente") {
          alert("Reserva creada exitosamente");
        } else {
          alert("Hubo un error al crear la reserva.");
        }
      } catch (error) {
        console.error("Error al crear la reserva:", error);
        alert("No se pudo crear la reserva. Intenta más tarde.");
      } finally {
        setCargando(false);
      }
    };
  
    return (
      <div className="crearReserva">
        {/* Contenedor para fecha y hora */}
        <div className="fecha-hora-container">
          <label>Fecha de Reserva:</label>
          <input
            type="date"
            name="fechaReserva"
            value={formData.fechaReserva}
            onChange={handleChange}
            required
          />
  
          <label>Hora de Inicio:</label>
          <input
            type="time"
            name="horaInicio"
            value={formData.horaInicio}
            onChange={handleChange}
            required
          />
  
          <label>Hora de Fin:</label>
          <input
            type="time"
            name="horaFin"
            value={formData.horaFin}
            onChange={handleChange}
            required
          />
  
          <button
            type="button"
            onClick={verificarDisponibilidad}
            disabled={cargando}
            className="button"
          >
            {cargando ? "Verificando disponibilidad..." : "Verificar Disponibilidad"}
          </button>
        </div>
  
        {/* Contenedor para Titulo */}
        <div className="tituloContenedor">
          <h3>Espacios Disponibles</h3>
        </div>
  
        {/* Contenedor para Espacios Disponibles */}
        <div className="espaciosDisponibles">
          {espaciosDisponibles.length > 0 ? (
            espaciosDisponibles.map((espacio) => (
              <div
                key={espacio._id}
                className={`espacioCard ${formData.espacioSeleccionado?._id === espacio._id ? "selected" : ""}`}
              >
                <p>{espacio.nombre}</p>
                <button
                  type="button"
                  className="button"
                  onClick={() => setFormData({ ...formData, espacioSeleccionado: espacio })}
                >
                  Reservar
                </button>
  
                {formData.espacioSeleccionado?._id === espacio._id && (
                  <div className="reservaDetalle">
                    <h4>Detalles de la Reserva</h4>
                    <p>Espacio: {formData.espacioSeleccionado.nombre}</p>
                    <p>Fecha: {formData.fechaReserva}</p>
                    <p>Hora Inicio: {formData.horaInicio}</p>
                    <p>Hora Fin: {formData.horaFin}</p>
                    <button
                      type="button"
                      onClick={confirmarReserva}
                      disabled={cargando}
                      className="button confirmButton"
                    >
                      {cargando ? "Confirmando..." : "Confirmar Reserva"}
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No se encontraron espacios disponibles.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default CrearReserva;