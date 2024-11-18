import React from "react";
import './body.css';
import CrearEspacio from '../crearEspacio'; // Asegúrate de que esta ruta sea correcta.
import ListarEspacios from '../listarEspacios'; // Asegúrate de que esta ruta sea correcta.
import ActualizarEspacios from '../actualizarEspacio'; // Asegúrate de que esta ruta sea correcta.
import EliminarEspacios from '../../Usuario/eliminarEspacio'; // Asegúrate de que esta ruta sea correcta.
import ReservasCalendario from '../historialReservas'; // Asegúrate de que esta ruta sea correcta.

const Body = ({ currentSection }) => {
    return (
        <div className="mainContent">
            {currentSection === "crearEspacio" && (
                <div>
                    <h2>Crear Nuevo Espacio</h2>
                    <CrearEspacio />
                </div>
            )}

            {currentSection === "listarEspacios" && (
                <div>
                    <h2>Espacios Creados</h2>
                    <ListarEspacios />
                </div>
            )}
            {currentSection === "actualizarEspacios" && (
                <div>
                    <h2>Actualizar Espacios </h2>
                    <ActualizarEspacios />
                </div>
            )}
            {currentSection === "eliminarEspacios" && (
                <div>
                    <h2>Eliminar Espacios </h2>
                    <EliminarEspacios />
                </div>
            )}

            {currentSection === "historialReservas" && (
                <div>
                    <h2>Historial de Reservas</h2>
                    <ReservasCalendario />
                </div>
            )}

        </div>
    );
};

export default Body;
