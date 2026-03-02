//Lähtötilanne, jossa valitaan maa (sekä ylläpidetään tilamuuttujana valittua maata) ja siirrytään sivulle /info

import { useState, useEffect, use } from "react";
import { useNavigate } from 'react-router';
import axios from "axios";
import Select from 'react-select';
import Button from 'react-bootstrap/Button';

const Menu = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countryNames, setCountryNames] = useState([]);
    const navigate = useNavigate();

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
            {/** Alasvetovalikko, joka näyttää maiden common nimet listana. Hakutoiminto, jolla voi hakea maan nimeä */}
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

                {/** Näytetään valittu maa alapuolella toistaiseksi*/}
                <p>
                Selected: {selectedCountry?.value?.common || "No country selected"}
                </p> 

                {/** Nappi josta siirrytään infosivulle ja välitetään valittu maa samalla*/}
                <Button variant="outline-dark" onClick={() => navigate("/info", {state: {country: selectedCountry?.value}})}>Get info</Button>

        </div>
    );
};

export default Menu