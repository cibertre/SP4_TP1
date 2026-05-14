import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

class SuperHeroService {

    async obtenerTodos() {
        return await superHeroRepository.obtenerTodos();
    }

    async obtenerPorId(id) {
        return await superHeroRepository.obtenerPorId(id);
    }
    async obtenerMayoresDe30YTierra() {

    return await superHeroRepository.obtenerMayoresDe30YTierra();
    }

    async crear(data) {
        if (!data) throw new Error("No data");

        if (!data.poderes) {
            data.poderes = [];
        }

        return await superHeroRepository.crear(data);
    }

    async actualizar(id, data) {
        return await superHeroRepository.actualizar(id, data);
    }

    async eliminar(id) {
        return await superHeroRepository.eliminar(id);
    }
}

export default new SuperHeroService();