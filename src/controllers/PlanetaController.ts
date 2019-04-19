import Planeta from '../schemas/Planeta'
import moongose from 'mongoose'
import { Request, Response } from 'express'

class PlanetaController {
    public async getAllPlanets(req: Request, res: Response): Promise<Response> {
        return res.json()
    }

    public async getPlanetById(req: Request, res: Response): Promise<Response> {
        const planet = await Planeta.findById({ _id: req.params.id }, (err, data) => {
            if(err) return res.status(500).json({
                message: err
            })
        })
        return res.json(planet)
    }
}

export default new PlanetaController()