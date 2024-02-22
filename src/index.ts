import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors' 
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { dbAuthenticate } from './startup/db'
import routeres from './startup/router'


dotenv.config()

const app = express(); 

app.use(helmet()); 
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
routeres(app)

const PORT = process.env.PORT || 3000 

dbAuthenticate()

let server = app.listen(PORT, async () => {
   console.log(`listning on port ${PORT}`)
})

export default server