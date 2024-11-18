import React, { useEffect, useState } from "react";
import axios from "axios";
import './listarEspacios.css';

const ListarEspacios = () => {
  const [espacios, setEspacios] = useState([]); // Lista completa de espacios
  const [filtrados, setFiltrados] = useState([]); // Lista de espacios filtrados
  const [error, setError] = useState(null); // Manejo de errores
  const [titulo, setTitulo] = useState("Lista de Espacios"); // Título dinámico

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
        setFiltrados(response.data); // Inicialmente, muestra todos los espacios
      } catch (error) {
        if (error.response) {
          setError(`Error al obtener espacios: ${error.response.data.message || error.response.data}`);
        } else {
          setError("Hubo un error desconocido al obtener los espacios.");
        }
      }
    };

    fetchEspacios();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Función para filtrar espacios por estado
  const filtrarPorEstado = (estado) => {
    if (estado === "todos") {
      setFiltrados(espacios); // Muestra todos los espacios
      setTitulo("Lista de Espacios");
    } else {
      const filtradosPorEstado = espacios.filter(espacio => espacio.estado === estado);
      setFiltrados(filtradosPorEstado);
      setTitulo(`Espacios en estado: ${estado}`);
    }
  };

  return (
    <div className="listarEspacios">
      <h2>{titulo}</h2>

      {error && <p className="error">{error}</p>}

      {/* Botones para filtrar por estado */}
      <div className="filtros">
        <button onClick={() => filtrarPorEstado("todos")}>Todos</button>
        <button onClick={() => filtrarPorEstado("activo")}>Activos</button>
        <button onClick={() => filtrarPorEstado("inactivo")}>Inactivos</button>
      </div>

      <div className="espaciosContainer">
        {filtrados.length === 0 && !error && <p>No hay espacios disponibles en este estado.</p>}

        {/* Mostrar la lista filtrada de espacios */}
        {filtrados.map((espacio) => (
          <div key={espacio._id} className="espacioCard">
            <h3>{espacio.nombre}</h3>
            <p><strong>Tipo:</strong> {espacio.tipo}</p>
            <p><strong>Capacidad:</strong> {espacio.capacidad}</p>
            <p><strong>Ubicación:</strong> {espacio.ubicacion}</p>
            <p><strong>Descripción:</strong> {espacio.descripcion}</p>
            <p><strong>Disponibilidad:</strong> {espacio.disponibilidad && espacio.disponibilidad.length > 0 ? espacio.disponibilidad.join(", ") : 'No disponible'}</p>
            <p><strong>Estado:</strong> {espacio.estado}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListarEspacios;
