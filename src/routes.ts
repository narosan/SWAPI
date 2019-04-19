import { Router } from 'express'
import PlanetaController from './controllers/PlanetaController'

const routes = Router()
routes.get('/', () => console.log('Bem vindo ao desafio do SWAPI :D'))
routes.get('/Planeta', PlanetaController.getAllPlanets)
routes.get('/Planeta/:id', PlanetaController.getPlanetById)


export default routes