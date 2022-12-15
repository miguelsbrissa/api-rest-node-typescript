import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import 'dotenv/config'
import { CidadeController } from '../controllers'


const router = Router()

router.get('/', (_, res) => {

	return res.status(StatusCodes.ACCEPTED).send('Hello World')
})


router.post('/cidades', CidadeController.createValidation, CidadeController.create)
router.get('/cidades', CidadeController.getAllValidation, CidadeController.getAll)
router.get('/cidades/:id', CidadeController.getByIdValidation, CidadeController.getById)
router.put('/cidades/:id', CidadeController.updateByIdValidation, CidadeController.updateById)
router.delete('/cidades/:id', CidadeController.deleteByIdValidation, CidadeController.deleteById)

export { router }