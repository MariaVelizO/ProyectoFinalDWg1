import React, { useEffect, useState } from "react";
import axios from "axios";
import './actualizarEspacios.css'; // Para los estilos, si los tienes

const ActualizarEspacios = () => {
  const [espacios, setEspacios] = useState([]);  // Para almacenar la lista de espacios
  const [error, setError] = useState(null);  // Para manejar los errores
  const [titulo, setTitulo] = useState("");  // Título dinámico
  const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);  // Espacio seleccionado para actualizar

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

  // Fetch para obtener los espacios por estado (activo o inactivo)
  const fetchEspaciosPorEstado = async (estado) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError("No estás autenticado. El token es requerido.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/api/admin/EspacioDisponible/${estado}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.length === 0) {
        setError(`No se encontraron espacios con el estado: ${estado}.`);
      } else {
        setEspacios(response.data);
        setError(null);
        setTitulo(estado === 'activo' ? 'Lista de Espacios Disponibles' : 'Lista de Espacios no Disponibles');
      }
    } catch (error) {
      if (error.response) {
        setError(`Error al obtener espacios: ${error.response.data.message || error.response.data}`);
      } else {
        setError("Hubo un error desconocido al obtener los espacios.");
      }
      setEspacios([]);
    }
  };

  // Manejar el cambio de estado cuando se selecciona un espacio para editar
  const handleEspacioChange = (e) => {
    const { name, value } = e.target;
    setEspacioSeleccionado({
      ...espacioSeleccionado,
      [name]: value,
    });
  };

  // Actualizar un espacio
  const handleUpdateEspacio = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError("No estás autenticado. El token es requerido.");
      return;
    }

    try {
      await axios.put(`http://localhost:3001/api/admin/updateEspacio/${espacioSeleccionado._id}`, espacioSeleccionado, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEspacios(espacios.map(espacio => 
        espacio._id === espacioSeleccionado._id ? espacioSeleccionado : espacio
      ));
      alert("Espacio actualizado correctamente");
      setEspacioSeleccionado(null);  // Reset espacio seleccionado
    } catch (error) {
      setError(`Error al actualizar espacio: ${error.response?.data.message || error.message}`);
    }
  };

  return (
    <div className="listarEspacios">
      <div className="buttonContainer">
        <button onClick={() => fetchEspaciosPorEstado('activo')}>Ver Espacios Activos</button>
        <button onClick={() => fetchEspaciosPorEstado('inactivo')}>Ver Espacios Inactivos</button>
      </div>

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

            {/* Botón para seleccionar un espacio para editar */}
            <button onClick={() => setEspacioSeleccionado(espacio)}>Editar</button>
          </div>
        ))}
      </div>

      {/* Formulario para actualizar un espacio */}
      {espacioSeleccionado && (
        <div className="updateForm">
          <h3>Actualizar Espacio</h3>
          <input
            type="text"
            name="nombre"
            value={espacioSeleccionado.nombre}
            onChange={handleEspacioChange}
            placeholder="Nombre"
          />
          <input
            type="text"
            name="tipo"
            value={espacioSeleccionado.tipo}
            onChange={handleEspacioChange}
            placeholder="Tipo"
          />
          <input
            type="number"
            name="capacidad"
            value={espacioSeleccionado.capacidad}
            onChange={handleEspacioChange}
            placeholder="Capacidad"
          />
          <input
            type="text"
            name="ubicacion"
            value={espacioSeleccionado.ubicacion}
            onChange={handleEspacioChange}
            placeholder="Ubicación"
          />
          <textarea
            name="descripcion"
            value={espacioSeleccionado.descripcion}
            onChange={handleEspacioChange}
            placeholder="Descripción"
          />
          <input
            type="text"
            name="disponibilidad"
            value={espacioSeleccionado.disponibilidad.join(", ")}
            onChange={handleEspacioChange}
            placeholder="Disponibilidad"
          />
          <select
            name="estado"
            value={espacioSeleccionado.estado}
            onChange={handleEspacioChange}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
          <button onClick={handleUpdateEspacio}>Actualizar Espacio</button>
        </div>
      )}
    </div>
  );
};

export default ActualizarEspacios;
