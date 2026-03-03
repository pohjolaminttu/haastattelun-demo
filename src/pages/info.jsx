/*Sivu, jolla näytetään tilamuuttujassa olevan maan infot (jotka haetaan palvelimelta)
Näkymässä on otsikkona maan nimi (sekä lyhennetty että virallinen) sekä maan pääkaupunki.
Tämän alla on kaksi taulukkoa, jotka renderöidään mikäli niihin tulee sisältöä: maan natiivit nimet sekä maan valuutat
*/

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router';
import axios from "axios";
import Button from 'react-bootstrap/Button';

const Info = () => {
    const [infos, setInfos] = useState([]);
    const selectedCountry = useLocation().state?.country;
    const navigate = useNavigate();

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
                    <h3><span className="text-style: italic text-[#808080]">Capital: </span>{country.capital}</h3>
                    <br />

                    {/**Lisätään maiden natiivin kieliset nimet taulukkona, mikäli maalla niitä on */}
                    {country.name.nativeName && Object?.keys(country.name.nativeName).length > 0 && (
                        <>
                            <p className="text-style: italic">Native names:</p>
                            <table className=" w-full text-center">
                                <thead >
                                    <tr>
                                        <th className="text-style: italic">Language code</th>
                                        <th className="text-style: italic">Common name</th>
                                        <th className="text-style: italic">Official name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(country.name?.nativeName).map(([langCode, native]) => (
                                        <tr key={langCode}>
                                            <td>{langCode}</td>
                                            <td>{native.common}</td>
                                            <td>{native.official}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>)} <br/>
                        
                    {/**Lisätään maiden valuutat taulukkona. Osalla maista on useampi valuutta ja osalla ei ole määritelty lainkaan (esim Antarctica) */}
                    {country.currencies && Object?.keys(country.currencies).length > 0  && (
                        <>
                            <p className="text-style: italic">Currencies:</p>
                            <table className=" w-full text-center">
                                <thead >
                                    <tr>
                                        <th className="text-style: italic">Language code</th>
                                        <th className="text-style: italic">Common name</th>
                                        <th className="text-style: italic">Official name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(country.name?.nativeName).map(([langCode, native]) => (
                                        <tr key={langCode}>
                                            <td>{langCode}</td>
                                            <td>{native.common}</td>
                                            <td>{native.official}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>)}
                </div>
            ))}
            {/** Nappi josta siirrytään takaisin hakuvalikkoon*/}
                <Button variant="outline-dark" onClick={() => navigate("/")}>Go back</Button>
        </div>
    );
};

export default Info