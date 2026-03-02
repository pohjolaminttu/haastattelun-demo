//Lähtötilanne, jossa valitaan maa (sekä ylläpidetään tilamuuttujana valittua maata) ja siirrytään sivulle /info

import { useState, useEffect, use } from "react";
import axios from "axios";
import Info from "./info";

const Menu = () => {
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [countryNames, setCountryNames] = useState([]);

    useEffect(() => {
        console.log('Effect for axios')
        axios
            .get("https://restcountries.com/v3.1/all?fields=name")
            .then(response => {
                console.log("Promise fulfilled :)")
                setCountryNames(response.data)
            })
    }, []);

    return (
        <div>
            {countryNames.map((country, index) => (
                <div key={index}>
                    {country.name.common}
                    </div>
            ))};
        </div>
    );
};

export default Menu

//< Info country={selectedCountry}/>