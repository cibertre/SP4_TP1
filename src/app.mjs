import express from 'express';
import methodOverride from 'method-override';
import path from 'path';

import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';

const app = express();

const PORT = process.env.PORT || 3000;

// =========================
// CONFIGURACION EJS
// =========================

app.set('view engine', 'ejs');

app.set(
    'views',
    path.join(process.cwd(), 'views')
);

// =========================
// MIDDLEWARES
// =========================

app.use(
    express.static(
        path.join(process.cwd(), 'public')
    )
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(methodOverride('_method'));

// =========================
// RUTAS
// =========================

app.use('/api', superHeroRoutes);

app.use('/', superHeroRoutes);

// =========================
// CONEXION DB
// =========================

connectDB();

// =========================
// 404
// =========================

app.use((req, res) => {

    res.status(404).send('Ruta no encontrada');

});

// =========================
// SERVIDOR
// =========================

app.listen(PORT, () => {

    console.log(`Servidor escuchando en puerto ${PORT}`);

});