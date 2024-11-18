import React, { useState } from 'react';
import Bar from "./Usuario/Bar Section/bar";
import Body from "./Usuario/Body Section/Body";

const Home = () => {
    const [currentSection, setCurrentSection] = useState("default"); // "default" muestra el contenido inicial.

    return (
        <div className="admin">
          
            <Bar onSectionChange={setCurrentSection} />
    
            <Body currentSection={currentSection} />
        </div>
    );
};

export default Home;
