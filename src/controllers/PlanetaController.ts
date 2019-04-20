import Planeta from '../schemas/Planeta'
import { Request, Response } from 'express'
import { Types } from 'mongoose'
import request from 'request'

const swAparicoes = async function(obj) {
    return new Promise((resolve, reject) => {
        request({ 
            url: `https://swapi.co/api/planets/?search=${obj.nome}`, 
            method: 'GET',
            json: true
        }, (error, resp, body) => {
            if(error || resp.statusCode > 399) reject(false)
            if(body.count == 0) resolve(body.count)
            try {
                resolve(body.results[0].films.length)
            } catch(err) {
                reject(err)
            }
        })
    })
}
class PlanetaController {   
    public async getAllPlanets(req: Request, res: Response): Promise<Response> {
        const planets = await Planeta.find()
        return res.json(planets)
    }

    public async getPlanetById(req: Request, res: Response): Promise<Response> {
        if(!Types.ObjectId.isValid(req.params.id))
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
        var jsonPlanet = new Array(req.body) // BugFix se usuário passar obj e não json não existia forEach para body
        jsonPlanet.forEach(async element => {
            element['aparicoes'] = await swAparicoes(element)
            await Planeta.create(element)
        })
        return res.status(200).json({
            message: `Planeta(s) criado(s) com sucesso!`
        })
    }

    public async updatePlanet(req: Request, res: Response): Promise<Response> {
        if(!Types.ObjectId.isValid(req.params.id))
            return res.status(404).json({
                message: `ID enviado não é do tipo ObjectID.`
            })
        const planet = await Planeta.updateOne({ _id: req.params.id }, req.body)
        .catch(err => {
            return res.status(500).json({
                message: `Erro ao atualizar o planeta de id: ${req.params.id}`,
                err: err
            })
        })
        return res.status(200).json({
            message: `Planeta de id: ${req.params.id} atualizado.`,
            obj: planet
        })
    }

    public async deletePlanet(req: Request, res: Response): Promise<Response> {
        if(!Types.ObjectId.isValid(req.params.id))
            return res.status(404).json({
                message: `ID enviado não é do tipo ObjectID.`
            })
        await Planeta.deleteOne({ id: req.params.id })
        .catch(err => {
            return res.status(500).json({
                message: `Erro ao excluir o documento de id: ${req.params.id}`,
                err: err
            })
        })
        return res.status(200).json({
            message: `Documento deletado com sucesso.`
        })
    }
}

export default new PlanetaController()