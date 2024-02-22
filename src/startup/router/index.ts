import { Application } from 'express'
import user from '../../routers/user'

export default (app: Application) => {
    app.use('/api/v1/user', user)
}