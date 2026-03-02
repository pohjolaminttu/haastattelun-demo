//Lähtötilanne, jossa valitaan maa (sekä ylläpidetään tilamuuttujana valittua maata) ja siirrytään sivulle /info

import { useState } from "react";
import Info from "./info";

const Menu = () => {
    const [country, setCountry] = useState("");

    return (

        
        < Info />
    );

};

export default Menu