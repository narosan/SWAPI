import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import routes from './routes'

class App {
    public express: express.Application
    constructor() {
        this.express = express()
        this.middleware()
        this.database()
        this.routes()
    }

    private middleware(): void {
        this.express.use(express.json())
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({ extended: false }))
        this.express.use(helmet())
    }

    private database(): void {
        mongoose.connect('mongodb://localhost:27017/swapi', {
            useNewUrlParser: true
        })
    }

    private routes(): void {
        this.express.use(routes)
    }
}

export default new App().express