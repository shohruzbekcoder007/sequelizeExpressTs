import { Application } from 'express'
import user from '../../routers/user'

export default (app: Application) => {
    app.use('/v1/user', user)
}