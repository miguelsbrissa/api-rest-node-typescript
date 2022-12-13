import { Router } from 'express'
import {StatusCodes} from 'http-status-codes'
import 'dotenv/config'

const router = Router()

router.post('/teste', (req, res) => {
	console.log(req.body)

	return res.status(StatusCodes.ACCEPTED).json(req.body)
})

router.get('/', (_, res) => {

	return res.status(StatusCodes.ACCEPTED).send('Hello World')
})

export {router}