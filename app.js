const lugar = require('./lugar/lugar');
const argv = require('./config/yargs').argv;
const clima = require('./clima/clima');

// esta funcion esta a la espera de una direccion y esa la mandaremos cuando llamemos la funcion
let getInfo = async(direccion) => {

    try {
        let coors = await lugar.getDirLonLat(direccion);
        let temperatura = await clima.getClima(coors.Latitud, coors.Longitud);

        return `El clima en ${coors.Direccion}, es de ${ temperatura }° grados celsius`

    } catch (error) {
        console.log(`No se pudo determinar el clima en ${direccion}`);
    }


}

// la direccion la estamos recibiendo por el metodo argv
getInfo(argv.direccion)
    .then((mensaje) => {
        console.log(mensaje);
    }).catch((err) => {
        console.log(err);
    });

// lugar.getDirLonLat(argv.direccion)
//     .then((resp) => {
//         console.log(resp);
//     }).catch((err) => {
//         console.log(err);
//     });

// clima.getClima(19.4326077, -99.133208)
//     .then((temp) => {
//         console.log(temp);
//     }).catch((err) => {
//         console.log(err);
//     });