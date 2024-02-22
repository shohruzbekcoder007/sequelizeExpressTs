import express from 'express'
import { createUser, loginUser } from '../controllers/user'
const user = express.Router()

user.post('/', createUser)
user.post('/login', loginUser)

export default user