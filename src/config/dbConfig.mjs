import mongoose from 'mongoose';
import { setServers } from 'node:dns/promises';

setServers(["1.1.1.1", "8.8.8.8"]);


export async function connectDB(){
    try {
        await mongoose.connect('mongodb+srv://grupo-27:grupo-27@cluster0.blryo.mongodb.net/NodeMod3Cohorte5');
        console.log('Conexion exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
    }
