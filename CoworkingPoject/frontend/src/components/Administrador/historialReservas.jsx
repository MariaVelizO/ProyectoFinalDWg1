import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './historialReservas.css'; // Si tienes estilos personalizados
import moment from 'moment';
import 'moment/locale/es';  // Importa la localización en español para moment

// Configura moment para usar español
moment.locale('es');

const ReservasCalendario = () => {
  const [reservas, setReservas] = useState([]); // Estado para todas las reservas
  const [selectedDate, setSelectedDate] = useState(null); // Fecha seleccionada
  const [reservasPorFecha, setReservasPorFecha] = useState([]); // Reservas del día seleccionado
  const [error, setError] = useState(null); // Manejo de errores

  // Obtener las reservas desde la API cuando se monta el componente
  useEffect(() => {
    const fetchReservas = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No estás autenticado. El token es requerido.");
        return;
      }
      
      try {
        const response = await axios.get("http://localhost:3001/api/admin/reservas", {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (response.data.success) {
          setReservas(response.data.data); // Guardar las reservas en el estado
        } else {
          setError(response.data.message); // Mostrar mensaje de error
        }
      } catch (error) {
        console.error("Error fetching reservas:", error);
        setError(`Error al cargar reservas: ${error.response?.data.message || error.message}`);
      }
    };
    
    
    fetchReservas();
  }, []);

  // Ajustar fecha de la reserva a la zona horaria local
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const reservasDelDia = reservas.filter(reserva => {
      const reservaDate = moment(reserva.fechaReserva).format('YYYY-MM-DD');
      const selectedDate = moment(date).format('YYYY-MM-DD');
      return reservaDate === selectedDate; 
    });
    console.log('Reservas para el día seleccionado:', reservasDelDia);
    setReservasPorFecha(reservasDelDia);
  };

  // Función para marcar los días con reservas
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (!Array.isArray(reservas)) {
        return; 
      }
  
      const hayReserva = reservas.some((reserva) => {
        const reservaDate = moment(reserva.fechaReserva).format('YYYY-MM-DD');
        const selectedDate = moment(date).format('YYYY-MM-DD');
        return reservaDate === selectedDate;
      });
  
      if (moment().isSame(date, 'day')) {
        return 'today';
      }
  
      return hayReserva ? "marked" : null;
    }
  };
  
  return (
    <div className="calendarioReservas">
      <h2>Calendario de Reservas</h2>
      <Calendar
        onClickDay={(date) => handleDateClick(date)}
        tileClassName={tileClassName}
        value={selectedDate}
        locale="es-ES"
      />

      {/* Mostrar las reservas para la fecha seleccionada */}
      <div className="detalleReservas">
        {selectedDate && (
          <>
            <h3>Reservas para: {selectedDate.toDateString()}</h3>
            {reservasPorFecha.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Espacio</th>
                    <th>Hora de Inicio</th>
                    <th>Hora de Fin</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {reservasPorFecha.map((reserva) => (
                    <tr key={reserva._id}>
                      <td>{reserva.usuario?.nombre || 'Nombre no disponible'}</td>
                      <td>{reserva.espacio?.nombre || 'Espacio no disponible'}</td>
                      <td>{reserva.horaInicio}</td>
                      <td>{reserva.horaFin}</td>
                      <td>{reserva.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay reservas para esta fecha.</p>
            )}
          </>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ReservasCalendario;
