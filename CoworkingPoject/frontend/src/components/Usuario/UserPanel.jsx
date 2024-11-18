import React, { useState } from 'react';
import Bar from "./Bar Section/bar";
import Body from "./Body Section/Body";

const UserPanel = () => {
    const [currentSection, setCurrentSection] = useState("default"); // "default" muestra el contenido inicial.

    return (
        <div className="usuario">
          
            <Bar onSectionChange={setCurrentSection} />
    
            <Body currentSection={currentSection} />
        </div>
    );
};


export default UserPanel;

