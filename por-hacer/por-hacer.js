const fs = require('fs');



let listadoPorHacer = [];


const borrar = (descripcion) => {

    cargaDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardaDB();
        return true;
    }

}

const guardaDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    })
}

const cargaDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }



}

const crear = (descripcion) => {

    cargaDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardaDB();
    return porHacer;
}

const getListado = () => {
    cargaDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargaDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
    if (index >= 0) {

        listadoPorHacer[index].completado = completado;
        guardaDB();
        return true;
    } else {
        return false;
    }


}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}