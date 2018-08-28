const argv = require('../config/yargs').argv;
const axios = require('axios');

// el encodeURI nos da como resultado una URL amistosa
let encodeURL = encodeURI(argv.direccion);

console.log(argv.direccion);
let getDirLonLat = async(direccion) => {

    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ encodeURL }&key=AIzaSyA-HXVa2jtkGfKtIJwisxgC46RaWqC1xuI`)

    if (resp.data.status === "ZERO_RESULTS") {
        throw new Error(`No hay resultados para la ciudad '${direccion}'  `)
    }
    // la informacion que necesitamos esta en data
    let location = resp.data.results[0];
    let coor = location.geometry.location;
    // console.log('Direccion: ', location.formatted_address);
    // console.log('Latitud: ', coor.lat);
    // console.log('Longitud: ', coor.lng);


    return {
        Direccion: location.formatted_address,
        Latitud: coor.lat,
        Longitud: coor.lng
    }
}

module.exports = {
    getDirLonLat
}