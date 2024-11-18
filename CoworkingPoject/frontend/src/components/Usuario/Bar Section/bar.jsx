import React from "react";
import './bar.css';

import logo from '../../../assets/logo.png';

//import { CiEdit, CiCircleList, CiSquarePlus, CiSquareRemove, CiCalendarDate } from "react-icons/ci";
const Bar = ({ onSectionChange }) => {
    return (
        <div className="bar grid">
            <div className="LogoDiv flex">
                <img src={logo} alt="logo" />
                <h2>CoworkSpace</h2>
            </div>

            <div className="menuDiv">
                <h3 className="divTitule">RESERVA</h3>
                <div className="buttonContainer">
                    <button
                        className="menuLink flex"
                        onClick={() => onSectionChange("CrearReservas")}
                    >
                        <span className="smallText">Crear Reserva</span>
                    </button>

                    <button
                        className="menuLink flex"
                        onClick={() => onSectionChange("ListarReserva")}
                    >
                        <span className="smallText">Historial Reserva</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Bar;