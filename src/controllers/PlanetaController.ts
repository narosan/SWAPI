import Planeta from '../schemas/Planeta'
import { Request, Response } from 'express'
import https from 'https'
import { ObjectID } from 'bson';

class PlanetaController {

    public option = {
        hosts: 'https://swapi.co',
        path: '/api/planets/',
        method: 'GET'
     }

    public async getAllPlanets(req: Request, res: Response): Promise<Response> {
        const planets = await Planeta.find()
        return res.json(planets)
    }

    public async getPlanetById(req: Request, res: Response): Promise<Response> {
        if(!(req.params.id instanceof ObjectID))
            return res.status(404).json({
                message: `ID enviado não é do tipo ObjectID.`
            })
        const planet = await Planeta.findById({ _id: req.params.id }, err => {
            if(err) return res.status(500).json({
                message: err
            })
        })
        return res.json(planet)
    }

    public async getPlanetByName(req: Request, res: Response): Promise<Response> {
        const planet = await Planeta.find({ nome: req.params.name }, err => {
            if(err) return res.status(500).json({
                message: err
            })
        })
        return res.json(planet)
    }

    public async createPlanet(req: Request, res: Response): Promise<Response> {
        var planets = await Planeta.create(req.body)
        return res.status(200).json({
            message: `Planeta(s) criado(s) com sucesso!`
        })
    }

    public async getAparicoes(req: Request, res: Response): Promise<Response> {
        const planets = https.request(this.option)
        return res.json(planets)
    } 

    public async updatePlanet(req: Request, res: Response): Promise<Response> {
        if(!(req.params.id instanceof ObjectID))
            return res.status(404).json({
                message: `ID enviado não é do tipo ObjectID.`
            })
        const planet = await Planeta.update({
            _id: req.params.id
        }, req.body, err => {
            return res.status(500).json({
                message: err
            })
        })
        return res.status(200).json({
            message: `Planeta de id: ${req.params.id} atualizado.`
        })
    }

    public async deletePlanet(req: Request, res: Response): Promise<Response> {
        if(!(req.params.id instanceof ObjectID))
            return res.status(404).json({
                message: `ID enviado não é do tipo ObjectID.`
            })

        const planet = await Planeta.deleteOne({_id: req.params.id},
             err => {
                res.status(500).json({
                    message: err
                })
             })
        return res.status(200).json({
            message: `Documento deletado com sucesso.`
        })
    }
}

export default new PlanetaController()