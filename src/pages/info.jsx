//Sivu, jolla näytetään tilamuuttujassa olevan maan infot (jotka haetaan palvelimelta)
import { useState, useEffect } from "react";
import axios from "axios";

const Info = (country) => {
    const [infos, setInfos] = useState([]);
    useEffect(() => {
        console.log('Effect for axios')
        axios
            .get(`https://restcountries.com/v3.1/all?fields=name/${country}`)
            .then(response => {
                console.log("Promise fulfilled :)")
                setInfos(response.data)
            })
    }, []);

    return (
        <p>{infos}</p>
    );
};

export default Info