import React from "react";
import './bar.css';

import logo from '../../../assets/logo.png';

import { CiEdit, CiCircleList, CiSquarePlus, CiSquareRemove, CiCalendarDate } from "react-icons/ci";

const Bar = ({ onSectionChange }) => {
    return (
        <div className="bar grid">
            <div className="LogoDiv flex">
                <img className="imgLogo" src={logo} alt="logo" />
                <h2>CoworkSpace</h2>
            </div>

            <div className="menuDiv">
                <h3 className="divTitule">GESTIONAR ESPACIOS</h3>
                <ul className="menuList grid">
                    <li className="listItem">
                        <button
                            className="menuLink flex"
                            onClick={() => onSectionChange("crearEspacio")}
                        >
                            <CiSquarePlus className="icon" />
                            <span className="smallText">Crear Espacio</span>
                        </button>
                    </li>
                    <li className="listItem">
                        <button
                            className="menuLink flex"
                            onClick={() => onSectionChange("listarEspacios")}
                        >
                            <CiCircleList className="icon" />
                            <span className="smallText">Listar Espacios</span>
                        </button>
                    </li>
                    <li className="listItem">
                        <button
                            className="menuLink flex"
                            onClick={() => onSectionChange("actualizarEspacios")}
                        >
                            <CiEdit className="icon" />
                            <span className="smallText">Actualizar Espacios</span>
                        </button>
                    </li>
                    <li className="listItem">
                        <button
                            className="menuLink flex"
                            onClick={() => onSectionChange("eliminarEspacios")}
                        >
                            <CiSquareRemove className="icon" />
                            <span className="smallText">Eliminar Espacios</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className="menuDiv">
                <h3 className="divTitule">HISTORIAL RESERVAS</h3>
                <ul className="menuList grid">
                    <li className="listItem">
                        <button
                            className="menuLink flex"
                            onClick={() => onSectionChange("historialReservas")}
                        >
                            <CiCalendarDate className="icon" />
                            <span className="smallText">Ver Historial</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Bar;
