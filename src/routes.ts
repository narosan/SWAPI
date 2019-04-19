import { Router } from 'express'
import PlanetaController from './controllers/PlanetaController'

const routes = Router()
routes.get('/', () => console.log('Bem vindo ao desafio do SWAPI :D'))
routes.get('/Planeta', PlanetaController.getAllPlanets)
routes.get('/Planeta/:id', PlanetaController.getPlanetById)
routes.get('/Planeta/Nome/:name', PlanetaController.getPlanetByName)
routes.post('/Planeta', PlanetaController.createPlanet)
routes.put('/Planeta/:id', PlanetaController.updatePlanet)
routes.delete('/Planet/:id', PlanetaController.deletePlanet)
routes.get('/Planeta/Aparicoes', PlanetaController.getAparicoes)

export default routes