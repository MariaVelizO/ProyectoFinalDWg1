import React, { useState } from 'react';
import Bar from "./Bar Section/bar";
import Body from "./Body Section/Body";

const AdminPanel = () => {
    const [currentSection, setCurrentSection] = useState("default"); // "default" muestra el contenido inicial.

    return (
        <div className="admin">
          
            <Bar onSectionChange={setCurrentSection} />
    
            <Body currentSection={currentSection} />
        </div>
    );
};


export default AdminPanel;

