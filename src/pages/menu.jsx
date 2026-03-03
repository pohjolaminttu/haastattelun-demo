//Lähtötilanne, jossa valitaan maa (sekä ylläpidetään tilamuuttujana valittua maata) ja siirrytään sivulle /info

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import axios from "axios";
import Select from 'react-select';
import Button from 'react-bootstrap/Button';

const Menu = () => {
    const [selectedCountry, setSelectedCountry] = useState(null); //Valitun maan nimiolio tallennetaan tilamuuttujana, joka annetaan info-sivulle vertailtavaksi
    const [countryNames, setCountryNames] = useState([]); //Otetaan palvelimelta tässä vaiheessa vasta maiden nimitiedot, jotta lataus on nopeampaa ja tehokkaampaa
    const navigate = useNavigate();

    //Ja tässä siis haetaan nimioliot, jotka tallennetaan tilamuuttujaksi. Valittua maata voi siis vaihtaa monta kertaa, ja eteenpäin infosivulle mennään vasta "Hae" napista
    useEffect(() => {
        console.log('Effect for axios')
        axios
            .get("https://restcountries.com/v3.1/all?fields=name")
            .then(response => {
                console.log("Promise fulfilled :)")
                setCountryNames(response.data)
            })
    }, []);

    //Tapahtumankäsittelä napille. Huolehtii, ettei eteenpäin mennä ennen valintaa
    const moveToInfo = () => {
        selectedCountry ? navigate("/info", { state: { country: selectedCountry?.value } })
            : alert("Choose a country!")
    }

    return (
        <div className="grid place-items-center text-center w-screen">
            <div className="bg-[#f2e3ff]">
            <div className="mb-5">
                {/** Alasvetovalikko, joka näyttää maiden common nimet listana. "Value" arvona pidetään koko nimiolio, jotta helppo etsiä oikea maa info-näkymässä.
             * Valikossa hakutoiminto, jolla voi hakea maan nimeä */}
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
                    onChange={(selected) => setSelectedCountry(selected)}
                />

                {/** DEBUG käyttöön: Näytetään valittu maa alapuolella 
                <p>
                    Selected: {selectedCountry?.value?.common || "No country selected"}
                </p> 
                */}
                </div>
                {/** Nappi josta siirrytään infosivulle ja välitetään valittu maa samalla*/}
                <Button variant="outline-dark" onClick={moveToInfo}>Search info</Button>
            </div>
            </div>
            
    );
};

export default Menu