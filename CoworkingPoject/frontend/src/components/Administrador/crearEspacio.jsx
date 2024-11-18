import React, { useState } from "react";
import './crearEspacio.css';
import axios from 'axios';

const CrearEspacio = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "oficina",
    capacidad: "",
    ubicacion: "",
    descripcion: "",
    disponibilidad: [],
    estado: "activo",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "disponibilidad") {
      // Tomar la cadena completa como un solo elemento en el array
      setFormData({
        ...formData,
        [name]: [value.trim()], // Agregar la cadena completa como un solo elemento en el array
      });
    } else if (name === "capacidad") {
      // Asegurarse de que la capacidad sea un número
      setFormData({
        ...formData,
        [name]: value ? parseInt(value) : "", // Convertir a número si tiene valor
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos requeridos tengan datos
    if (!formData.nombre || !formData.ubicacion || formData.disponibilidad.length === 0) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Obtener el token del localStorage
    const token = localStorage.getItem('token'); // Obtener el token de localStorage

    // Verificar si el token existe
    if (!token) {
      alert("No estás autenticado. El token es requerido.");
      return;
    }

    try {
      // Hacer la solicitud POST con el token
      const response = await axios.post('http://localhost:3001/api/admin/Espacio', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Enviar el token en los encabezados
          'Content-Type': 'application/json', // Asegúrate de que los datos sean enviados como JSON
        }
      });

      console.log("Espacio creado con éxito:", response.data);
      alert("Espacio creado con éxito");
    } catch (error) {
      // Manejo de errores más detallado
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.data);
        alert(`Hubo un error al crear el espacio: ${error.response.data.message || error.response.data}`);
      } else {
        console.error("Error desconocido:", error);
        alert("Hubo un error desconocido al enviar la solicitud.");
      }
    }
  };

  return (
    <div className="crearEspacio">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del espacio"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <select name="tipo" value={formData.tipo} onChange={handleChange}>
          <option value="oficina">Oficina</option>
          <option value="sala de reuniones">Sala de Reuniones</option>
          <option value="escritorios">Escritorios</option>
        </select>
        <input
          type="number"
          name="capacidad"
          placeholder="Capacidad"
          value={formData.capacidad}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación"
          value={formData.ubicacion}
          onChange={handleChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="disponibilidad"
          placeholder="Disponibilidad"
          value={formData.disponibilidad.join(", ")} // Muestra los elementos como una cadena
          onChange={handleChange}
          required
        />
        <button type="submit">Crear Espacio</button>
      </form>
    </div>
  );
};

export default CrearEspacio;
