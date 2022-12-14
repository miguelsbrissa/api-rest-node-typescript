import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import 'dotenv/config'
import { CidadeController } from '../controllers'

const router = Router()

router.get('/', (_, res) => {

	return res.status(StatusCodes.ACCEPTED).send('Hello World')
})


router.post('/cidades', CidadeController.create)

export { router }