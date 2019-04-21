import Planeta from '../schemas/Planeta'
import { Request, Response, response } from 'express'
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
            
            //Pesquisa do search ocorre por like, essa validação impede de trazer aparições de que não pertence ao filme
            if(body.results[0].name != obj.nome) resolve(0) 
            
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
        try {
            var jsonPlanet = new Array(req.body)
            for(let i = 0; i < jsonPlanet.length; i++) 
                jsonPlanet[i]['aparicoes'] = await swAparicoes(jsonPlanet[i])

            await Planeta.create(jsonPlanet)
            .then((resp) => {
                return res.status(200).json({
                    message: 'Planeta(s) criados com sucesso.',
                    obj: resp
                })
            })
            .catch((err) => {
                return res.status(404).json({
                    message: err
                })
            })
            
        } catch(err) {
            return res.json(err)
        }        
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