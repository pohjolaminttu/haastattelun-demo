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
            /**Hakee tiedot vain siltä maalta, jonka "name" olio vastaa Info:lle välitettyä nameoliota */
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
        <div className="text-center">
            {infos?.map(country => (
                <div key={country.name.official}>
                    <h1>{country.name.common}</h1>
                    <h2><span className="text-style: italic text-[#808080]">Official name:</span> {country.name.official}</h2>
                    <br />
                    <p className="text-style: italic">Native names:</p>
                    <table>
                        <thead>
                            <tr>
                                <th className="text-style: italic">Language code</th>
                                <th className="text-style: italic">Common name</th>
                                <th className="text-style: italic">Official name</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default Info