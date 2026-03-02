//Lähtötilanne, jossa valitaan maa (sekä ylläpidetään tilamuuttujana valittua maata) ja siirrytään sivulle /info

import { useState, useEffect, use } from "react";
import axios from "axios";
import Select from 'react-select';
import Info from "./info";

const Menu = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
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

            <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                name="Country"
                options={countryNames.map((country) => ({
                    value: country.name,
                    label: country.name.common
                }))}
                onChange={(selected)=>setSelectedCountry(selected)}
                />

                <p>
                Selected: {selectedCountry?.value?.common || "No country selected"}
                </p> 

        </div>
    );
};

export default Menu

//  {selectedCountry && <Info country={selectedCountry.value} />}
