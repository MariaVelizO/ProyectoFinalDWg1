import React from "react";
import './bar.css';

import logo from '../../../assets/logo.png';

const UsuBar = ({ onSectionChange }) => {
    return (
        <div className="UsuBar grid">
            <div className="UsuLogoDiv flex">
                <img className="imgLogo" src={logo} alt="logo" />
                <h2>CoworkSpace</h2>
            </div>

            <div className="UsuMenuDiv">
                <h3 className="UsuDivTitule">RESERVA</h3>
                <div className="UsuButtonContainer">
                    <button
                        className="UsuMenuLink flex"
                        onClick={() => onSectionChange("CrearReservas")}
                    >
                        <span className="UsuSmallText">Crear Reserva</span>
                    </button>

                    <button
                        className="UsuMenuLink flex"
                        onClick={() => onSectionChange("ListarReserva")}
                    >
                        <span className="UsuSmallText">Historial Reserva</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UsuBar;