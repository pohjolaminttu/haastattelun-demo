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
                    const countryInfo = await axios.get(`https://restcountries.com/v3.1/name/${selectedCountry.common}?fullText=true&fields=name,capital,currencies,flags,region,capitalInfo,languages`);
                    setInfos(countryInfo.data[0]);

                    /**Tallennetaan koordinaatit ja haetaan säätiedot eri API:lta */
                    const lat = countryInfo.data[0].capitalInfo?.latlng[0];
                    const lon = countryInfo.data[0].capitalInfo?.latlng[1];

                    console.log("Koordinaatit: ", lat, lon);

                    if (lat && lon) {
                        const weatherResponse = await axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}&altitude=90`);
                        setWeather(weatherResponse.data);
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
        <div className="grid place-items-center text-center w-screen mx-auto">
            {infos ? (
                <div className="bg-[#ede8ff] p-5 rounded-2xl shadow-xl mb-5">
                    <div className="flex gap-4 justify-between pb-5">
                        {infos.flags && (
                            <>
                                <h1>{infos.name.common.toUpperCase()}</h1>
                                <img
                                    src={infos.flags.svg}
                                    className="inline w-40 h-auto"
                                    alt={infos.name.common} />
                            </>)}
                    </div>

                    <h2><span className="text-style: italic text-[#808080]">Official name:</span> {infos.name.official}</h2>
                    <h2><span className="text-style: italic text-[#808080]">Capital: </span>{infos.capital}</h2>
                    <h2><span className="text-style: italic text-[#808080]">Region: </span>{infos.region}</h2>
                    <br />

                    <div className="bg-[#d8cfff] p-2 mb-4 rounded-xl shadow-md">
                        {infos.languages && Object?.keys(infos.languages).length > 0 && (
                            <>
                                <h3 className="text-style: italic">Languages:</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {Object.entries(infos?.languages).map(([short, name]) => (
                                        <p key={short}>{name}</p>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>


                    <div className="bg-[#d8cfff] p-2 rounded-xl shadow-md">
                        {/**Lisätään maiden valuutat taulukkona. Osalla maista on useampi valuutta ja osalla ei ole määritelty lainkaan (esim Antarctica) */}
                        {infos.currencies && Object?.keys(infos.currencies).length > 0 && (
                            <>
                                <h3 className="text-style: italic">Currencies:</h3>
                                <table className="w-full text-center">
                                    <thead >
                                        <tr>
                                            <th>Short</th>
                                            <th>Name</th>
                                            <th>Symbol</th>
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
                    </div>
                    <br />


                    {/**Jotta sään reaaliaikaisuus tuntuisi, lisäsin "ledin" indikoimaan jatkuvaa päivitystä :D */}
                    <div className="bg-[#d8cfff] p-2 rounded-xl shadow-md">
                        <span className="inline-block w-3 h-3 bg-[#ff0000] rounded-2xl shadow-[0px_0px_6px_0px_rgba(255,0,0,0.4)] animate-[blink_1s_step-start_infinite]"></span>
                        <h3 className="inline">{" "}Weather</h3>

                        {weather?.properties?.timeseries?.length > 0 && (
                            <p>
                                Air temperature: {" "}
                                {weather.properties.timeseries[0].data.instant.details.air_temperature}{" "}
                                {weather.properties.meta.units.air_temperature}
                                <br />
                                Wind speed: {" "}
                                {weather.properties.timeseries[0].data.instant.details.wind_speed}{" "}
                                {weather.properties.meta.units.wind_speed}
                                <br />
                                Humidity: {" "}
                                {weather.properties.timeseries[0].data.instant.details.relative_humidity}{" "}
                                {weather.properties.meta.units.relative_humidity}
                            </p>
                        )}
                    </div>
                </div>
            ) : (null)}


            {/** Nappi josta siirrytään takaisin hakuvalikkoon*/}
            <Button variant="outline-dark" onClick={() => navigate("/")}>Go back</Button>
        </div>
    );
};

export default Info


