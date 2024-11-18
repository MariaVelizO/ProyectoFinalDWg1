import React from "react";
import './body.css';
import CrearReservas from '../../Usuario/crearReservas'; 
import ListarReserva from '../../Usuario/listarReserva'; 

const Body = ({ currentSection }) => {
    return (
        <div className="mainContent">
            {currentSection === "CrearReservas" && (
                <div>
                    <h2>Crear Nueva reserva</h2>
                    <CrearReservas />
                </div>
            )}

            {currentSection === "ListarReserva" && (
                <div>
                    <h2>Reservas Creadas</h2>
                    <ListarReserva />
                </div>
            )}
            
            {currentSection === "default" && (
                <div>
                    <h2>Bienvenido al Panel de usuario</h2>
                    <p>Selecciona una opción del menú para comenzar.</p>
                </div>
            )}
        </div>
    );
};

export default Body;
