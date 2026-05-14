import mongoose from 'mongoose';

const superheroSchema = new mongoose.Schema({

    nombreSuperHeroe: {
        type: String,
        required: [
            true,
            "El nombre del superhéroe es obligatorio"
        ],
        trim: true,
        minlength: [
            3,
            "Debe tener al menos 3 caracteres"
        ],
        maxlength: [
            60,
            "No puede superar los 60 caracteres"
        ]
    },

    nombreReal: {
        type: String,
        required: [
            true,
            "El nombre real es obligatorio"
        ],
        trim: true,
        minlength: [
            3,
            "Debe tener al menos 3 caracteres"
        ],
        maxlength: [
            60,
            "No puede superar los 60 caracteres"
        ]
    },

    edad: {
        type: Number,
        required: [
            true,
            "La edad es obligatoria"
        ],
        min: [
            1,
            "La edad no puede ser negativa"
        ]
    },

    planetaOrigen: {
        type: String,
        default: 'Desconocido'
    },

    debilidad: String,

    poderes: {

        type: [String],

        required: [
            true,
            "Los poderes son obligatorios"
        ],

        validate: [

            {
                validator: function (arr) {
                    return arr.length > 2;
                },

                message:
                    "Debe tener al menos 2 poderes"
            },

            {
                validator: function (arr) {

                    return arr.every(p =>
                        typeof p === 'string' &&
                        p.trim().length >= 3 &&
                        p.trim().length <= 60
                    );
                },

                message:
                    "Cada poder debe tener entre 3 y 60 caracteres y no estar vacío"
            }
        ]
    },

    aliados: [String],

    enemigos: [String],

    creador: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const SuperHero = mongoose.model(
    'SuperHero',
    superheroSchema,
    'Grupo-27'
);

export default SuperHero;