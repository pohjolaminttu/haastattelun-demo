//Sivu, jolla näytetään tilamuuttujassa olevan maan infot (jotka haetaan palvelimelta)
import { useState, useEffect } from "react";
import { useNavigation, useLocation } from 'react-router';
import axios from "axios";

const Info = () => {
    const [infos, setInfos] = useState([]);
    const selectedCountry = useLocation().state?.country;

    useEffect(() => {
        console.log('Effect for axios')
        if (selectedCountry?.common) {
            {/**Hakee tiedot vain siltä maalta, jonka "name" olio vastaa Info:lle välitettyä oliota */}
            axios
                .get(`https://restcountries.com/v3.1/name/${selectedCountry.common}?fullText=true`)
                .then(response => {
                    console.log("Promise fulfilled :)")
                    console.log("Palvelimen vastaus (olio):", response.data);
                    setInfos(response.data);
                })
                .catch(err => console.log("Virhe haussa:", err));
            }
        }, [selectedCountry]);


return (
    <div>
        <p>Tiedot (ei vielä nähtävillä)</p>
    </div>
);
};

export default Info