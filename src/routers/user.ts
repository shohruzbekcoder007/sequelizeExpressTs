import express from 'express'
import { createUser } from '../controllers/user'
const user = express.Router()

user.post('/', createUser)

export default user