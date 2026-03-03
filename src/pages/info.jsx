/*Sivu, jolla näytetään tilamuuttujassa olevan maan infot (jotka haetaan palvelimelta)
Näkymässä on otsikkona maan nimi (sekä lyhennetty että virallinen) sekä maan pääkaupunki.
Tämän alla on kaksi taulukkoa, jotka renderöidään mikäli niihin tulee sisältöä: maan natiivit nimet sekä maan valuutat
*/

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router';
import axios from "axios";
import Button from 'react-bootstrap/Button';

const Info = () => {

    const [infos, setInfos] = useState(null);
    const [weather, setWeather] = useState(null);
    const navigate = useNavigate();
    const selectedCountry = useLocation().state?.country;


    //Hakee axios avulla kahdesta eri API:sta tietoja Info näkymään
    useEffect(() => {
        console.log('Effect for axios')
        if (selectedCountry?.common) {
            const fetchData = async () => {

                /**Hakee tiedot vain siltä maalta, jonka "name" olio vastaa Info:lle välitettyä nameoliota */
                try {
                    const countryInfo = await axios.get(`https://restcountries.com/v3.1/name/${selectedCountry.common}?fullText=true&fields=name,capital,currencies,flags,region,capitalInfo`);
                    setInfos(countryInfo.data[0]);

                    /**Tallennetaan koordinaatit ja haetaan säätiedot eri API:lta */
                    const lat = countryInfo.data[0].capitalInfo?.latlng[0];
                    const lon = countryInfo.data[0].capitalInfo?.latlng[1];

                    console.log("Koordinaatit: ", lat, lon);

                    if (lat && lon) {
                        const weather = await axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}&altitude=90`);
                        setWeather(weather.data);
                    }
                } catch (err) {
                    console.log("Virhe haussa:", err);

                }
            };
            fetchData();
        }
    }, [selectedCountry]);

    console.log(weather);


    return (
        <div className="text-center">
            {infos ? (
                <div>
                    <h1>{infos.name.common}</h1>
                    {infos.flags && (
                        <img
                            src={infos.flags.svg}
                            className="inline w-40 h-auto"
                            alt={infos.name.common} />)
                    }

                    <h2><span className="text-style: italic text-[#808080]">Official name:</span> {infos.name.official}</h2>
                    <h3><span className="text-style: italic text-[#808080]">Capital: </span>{infos.capital}</h3>
                    <h3><span className="text-style: italic text-[#808080]">Region: </span>{infos.region}</h3>
                    <br />

                    {/**Lisätään maiden valuutat taulukkona. Osalla maista on useampi valuutta ja osalla ei ole määritelty lainkaan (esim Antarctica) */}
                    {infos.currencies && Object?.keys(infos.currencies).length > 0 && (
                        <>
                            <p className="text-style: italic">Currencies:</p>
                            <table className=" w-full text-center">
                                <thead >
                                    <tr>
                                        <th className="text-style: italic">Currency short</th>
                                        <th className="text-style: italic">Name</th>
                                        <th className="text-style: italic">Symbol</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(infos?.currencies).map(([currencyCode, currencyData]) => (
                                        <tr key={currencyCode}>
                                            <td>{currencyCode}</td>
                                            <td>{currencyData.name}</td>
                                            <td>{currencyData.symbol}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>)}
                    <br />


                    <h2 className="text-style: italic">Weather</h2>
            
                    {/**ATM Ottaa siis vaa yksikön lol. Kaivappa sieltä se numero */}
                    {weather?.properties?.meta?.units?.air_temperature &&
                        <p>{weather.properties.meta.units.air_temperature}</p>}

                </div>
            ):(null)};


            {/** Nappi josta siirrytään takaisin hakuvalikkoon*/}
            <Button variant="outline-dark" onClick={() => navigate("/")}>Go back</Button>
        </div>
    );
};

export default Info

/**Jos jaksan nii voi laittaa nappien taakse asioita. Mut otin atm pois koska vähä random tieto

    //Jotta sivu ei näyttäisi ruuhkaiselta, epäolennaisemmat ja taulukkomuotoiset tiedot avaataan napin painalluksella
    const [showNativeNames, setShowNativeNames] = useState(false);
    const [showCurrencies, setShowCurrencies] = useState(false);
    const [showLanguages, setShowLanguages] = useState(false);
    
    NATIVE NAMES
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
                        </>)}
    */