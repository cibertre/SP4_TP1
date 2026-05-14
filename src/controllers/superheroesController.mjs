import service from '../services/superheroesService.mjs';
import {
    renderizarSuperheroe,
    renderizarListaSuperheroes
} from '../views/responseView.mjs';

import SuperHero from '../models/SuperHero.mjs';


// =========================
// CREAR
// =========================

export const agregarSuperheroeController = async (req, res) => {
    try {
        const data = req.body;

        data.nombreSuperHeroe = data.nombreSuperHeroe?.trim() || '';

        if (data.poderes) {
            data.poderes = data.poderes
                .split(',')
                .map(p => p.trim());
        } else {
            data.poderes = [];
        }

        await service.crear(data);

        res.redirect('/heroes');

    } catch (error) {

        res.status(400).send(error.message);

    }
};


// =========================
// ELIMINAR
// =========================

export const eliminarSuperheroeController = async (req, res) => {

    try {

        const { id } = req.params;

        await service.eliminar(id);

        res.redirect('/heroes');

    } catch (error) {

        res.status(500).send(error.message);

    }
};


// =========================
// EDITAR
// =========================

export const editarSuperheroeController = async (req, res) => {

    try {

        const { id } = req.params;

        const data = req.body || {};

        data.nombreSuperHeroe =
            data.nombreSuperHeroe?.trim() || '';

        if (data.poderes) {

            data.poderes = data.poderes
                .split(',')
                .map(p => p.trim());

        } else {

            data.poderes = [];

        }

        await service.actualizar(id, data);

        res.redirect('/heroes');

    } catch (error) {

        res.status(500).send(error.message);

    }
};


// =========================
// FORMULARIO EDITAR
// =========================
export const mostrarFormularioEditar = async (req, res) => {

    try {

        const { id } = req.params;

        const hero = await service.obtenerPorId(id);

        if (!hero) {
            return res.status(404).send('Superhéroe no encontrado');
        }

        res.render('editSuperhero', {
    hero,
    errores: []
});

    } catch (error) {

        res.status(500).send(error.message);

    }
};


// =========================
// OBTENER POR ID
// =========================

export async function obtenerSuperheroePorIdController(req, res) {

    try {

        const { id } = req.params;

        const superheroe = await service.obtenerPorId(id);

        if (!superheroe) {

            return res.status(404).send({
                mensaje: 'Superheroe no encontrado'
            });

        }

        const superheroeFormateado =
            renderizarSuperheroe(superheroe);

        res.status(200).json(superheroeFormateado);

    } catch (error) {

        res.status(500).send({
            mensaje: 'Error al obtener el superheroe',
            error: error.message
        });

    }
}


// =========================
// OBTENER TODOS JSON
// =========================

export const obtenerTodosJSON = async (req, res) => {

    try {

        const heroes = await service.obtenerTodos();

        res.json(heroes);

    } catch (error) {

        res.status(500).send(error.message);

    }
};


// =========================
// OBTENER TODOS VISTA
// =========================


export const obtenerTodosVista = async (req, res) => {
    try {
        const heroes = await service.obtenerTodos();
        res.render('dashboard', { heroes });

    } catch (error) {
        res.status(500).send(error.message);
    }
};

// =========================
// BUSCAR POR ATRIBUTO
// =========================

export async function buscarSuperheroesPorAtributoController(req, res) {

    try {

        const { q } = req.query;

        const heroes = await service.obtenerTodos();

        let filtrados = heroes;

        if (q) {

            filtrados = heroes.filter(hero =>
                (hero.nombreSuperHeroe || '')
                    .toLowerCase()
                    .includes(q.toLowerCase())
            );
        }

        res.render('dashboard', {
            heroes: filtrados,
            q
        });

    } catch (error) {

        res.status(500).send({
            mensaje: 'Error al buscar superheroes',
            error: error.message
        });

    }
}


// =========================
// MAYORES DE 30
// =========================

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {

    try {

        const superheroes =
            await service.obtenerSuperheroesMayoresDe30();

        if (superheroes.length === 0) {

            return res.status(404).send({
                mensaje:
                    'No se encontraron superheroes mayores de 30 años'
            });

        }

        const superheroesFormateados =
            renderizarListaSuperheroes(superheroes);

        res.status(200).json(superheroesFormateados);

    } catch (error) {

        res.status(500).send({
            mensaje:
                'Error al obtener superheroes mayores de 30',
            error: error.message
        });

    }
}


// =========================
// ACTUALIZAR API
// =========================
export async function obtenerMayoresDe30YTierraController(req, res) {

    try {

        const heroes =
            await service.obtenerMayoresDe30YTierra();

        if (heroes.length === 0) {

            return res.status(404).json({
                mensaje:
                    'No se encontraron héroes mayores de 30 de la Tierra'
            });
        }

        res.status(200).json(heroes);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error al filtrar héroes',
            error: error.message
        });
    }
}
export const actualizarSuperheroeController =
    async (req, res) => {

        try {

            const { id } = req.params;

            const heroeActualizado =
                await SuperHero.findByIdAndUpdate(
                    id,
                    req.body,
                    { returnDocument: 'after' }
    );

            res.status(200).json(heroeActualizado);

        } catch (error) {

            res.status(500).json({
                mensaje:
                    'Error al actualizar el superheroe'
            });

        }
    };


// =========================
// BORRAR POR ID
// =========================

export const borrarSuperheroePorIdController =
    async (req, res) => {

        try {

            const { id } = req.params;

            const heroeEliminado =
                await SuperHero.findByIdAndDelete(id);

            res.status(200).json(heroeEliminado);

        } catch (error) {

            res.status(500).json({
                mensaje:
                    'Error al borrar el superheroe'
            });

        }
    };


// =========================
// BORRAR POR NOMBRE
// =========================

export const borrarSuperheroePorNombreController =
    async (req, res) => {

        try {

            const { nombre } = req.params;

            const heroeEliminado =
                await SuperHero.findOneAndDelete({
                    nombreSuperHeroe: nombre
                });

            res.status(200).json(heroeEliminado);

        } catch (error) {

            res.status(500).json({
                mensaje:
                    'Error al borrar el superheroe'
            });

        }
    };