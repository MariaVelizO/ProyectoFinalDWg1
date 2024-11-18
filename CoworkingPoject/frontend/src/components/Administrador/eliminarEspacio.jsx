import React, { useEffect, useState } from "react";
import axios from "axios";
import './eliminarEspacio.css'; // Para los estilos, si los tienes

const EliminarEspacios = () => {
  const [espacios, setEspacios] = useState([]);  // Para almacenar la lista de espacios
  const [error, setError] = useState(null);  // Para manejar los errores
  const [titulo, setTitulo] = useState("");  // Título dinámico

  // Fetch para obtener todos los espacios
  useEffect(() => {
    const fetchEspacios = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError("No estás autenticado. El token es requerido.");
        return;
      }

      try {
        const response = await axios.get('http://localhost:3001/api/admin/Espacios', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setEspacios(response.data);
        setTitulo('Lista de Espacios');  // Establece el título cuando se obtienen los espacios
      } catch (error) {
        if (error.response) {
          setError(`Error al obtener espacios: ${error.response.data.message || error.response.data}`);
        } else {
          setError("Hubo un error desconocido al obtener los espacios.");
        }
      }
    };

    fetchEspacios();
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  // Eliminar un espacio
  const handleDeleteEspacio = async (id) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError("No estás autenticado. El token es requerido.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/admin/deleteEspacio/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setEspacios(espacios.filter(espacio => espacio._id !== id));  // Actualiza la lista de espacios después de eliminar
      alert("Espacio eliminado correctamente");
    } catch (error) {
      setError(`Error al eliminar espacio: ${error.response?.data.message || error.message}`);
    }
  };

  return (
    <div className="listarEspacios">
      <h2>{titulo}</h2>  {/* Título dinámico basado en el estado */}

      {error && <p className="error">{error}</p>}

      <div className="espaciosContainer">
        {espacios.length === 0 && !error && <p>No hay espacios disponibles.</p>}

        {/* Mostrar la lista de espacios */}
        {espacios.map((espacio) => (
          <div key={espacio._id} className="espacioCard">
            <h3>{espacio.nombre}</h3>
            <p><strong>Tipo:</strong> {espacio.tipo}</p>
            <p><strong>Capacidad:</strong> {espacio.capacidad}</p>
            <p><strong>Ubicación:</strong> {espacio.ubicacion}</p>
            <p><strong>Descripción:</strong> {espacio.descripcion}</p>
            <p><strong>Disponibilidad:</strong> {espacio.disponibilidad.join(", ")}</p>
            <p><strong>Estado:</strong> {espacio.estado}</p>

            {/* Botón para eliminar un espacio */}
            <button onClick={() => handleDeleteEspacio(espacio._id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EliminarEspacios;
