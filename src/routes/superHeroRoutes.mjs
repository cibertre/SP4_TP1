import express from 'express';
const router = express.Router();

import {
    obtenerSuperheroePorIdController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    obtenerTodosVista,
    agregarSuperheroeController,
    editarSuperheroeController,
    eliminarSuperheroeController,
    mostrarFormularioEditar,
    obtenerMayoresDe30YTierraController
} from '../controllers/superheroesController.mjs';
import {
 validarSuperHeroe,
 manejarErrores
} from '../middlewares/validations.mjs';


router.get('/', (req, res) => {

    res.render('home', {
        titulo: 'Inicio'
    });

});
router.get('/nosotros', (req, res) => {

    res.render('nosotros');

});

// VISTAS
router.get('/heroes', obtenerTodosVista);

//  IMPORTANTE: rutas específicas primero
router.get('/heroes/agregar', (req, res) => {
    res.render('addSuperhero', {
        errores: [],
        oldData: {}
    });
});

router.get('/heroes/:id/editar', mostrarFormularioEditar);


// API
router.get('/heroes/mayores-de-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/mayores-de-30-tierra', obtenerMayoresDe30YTierraController);
router.get('/heroes/buscar', buscarSuperheroesPorAtributoController);

// Ruta dinamica

router.get('/heroes/:id', obtenerSuperheroePorIdController);



// ACCIONES

router.put(
    '/heroes/:id',
    validarSuperHeroe,
    manejarErrores,
    editarSuperheroeController
);
router.post(
    '/heroes/agregar',
    validarSuperHeroe,
    manejarErrores,
    agregarSuperheroeController
);
router.delete('/heroes/:id', eliminarSuperheroeController);


export default router;