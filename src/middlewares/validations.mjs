import { body, validationResult } from 'express-validator';

export const validarSuperHeroe = [

    body('nombreSuperHeroe')
        .trim()
        .notEmpty()
        .withMessage('El nombre del superhéroe es obligatorio')
        .isLength({ min: 3 })
        .withMessage('Debe tener al menos 3 caracteres'),

    body('nombreReal')
    .trim()
    .notEmpty()
    .withMessage('El nombre real es obligatorio')
    .isLength({ min: 4 })
    .withMessage('El nombre debe tener al menos 4 caracteres')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage('Solo puede contener letras'),

    body('edad')
        .notEmpty()
        .withMessage('La edad es obligatoria')
        .isInt({ min: 1, max: 999 })
        .withMessage('La edad debe ser un número válido'),

    body('planetaOrigen')
        .trim()
        .notEmpty()
        .withMessage('El planeta es obligatorio'),
    body('poderes')
        .notEmpty()
        .withMessage('Los poderes son obligatorios')
        .custom(value => {

        const poderes = value
            .split(',')
            .map(p => p.trim())
            .filter(p => p.length > 0);

        if (poderes.length < 2) {
            throw new Error(
                'Debe ingresar al menos 2 poderes'
            );
        }

        return true;
    }),

    body('debilidad')
        .trim()
        .notEmpty()
        .withMessage('La debilidad es obligatoria'),
    body('creador')
        .trim()
        .notEmpty()
        .withMessage('El creador es obligatorio')
        .isLength({ min: 3 })
        .withMessage('Creador debe tener al menos 3 caracteres'),
];

export const manejarErrores = (req, res, next) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {

        const esEdicion = req.method === 'PUT';

        return res.status(400).render(
            esEdicion
                ? 'editSuperhero'
                : 'addSuperhero',
            {
                errores: errores.array(),
                oldData: req.body,
                hero: {
                    ...req.body,
                    _id: req.params.id
                }
            }
        );
    }

    next();
};