import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import 'dotenv/config'
import { CidadeController, PessoaController } from '../controllers'


const router = Router()

router.get('/', (_, res) => {

	return res.status(StatusCodes.ACCEPTED).send('Hello World')
})


router.post('/cidades', CidadeController.createValidation, CidadeController.create)
router.get('/cidades', CidadeController.getAllValidation, CidadeController.getAll)
router.get('/cidades/:id', CidadeController.getByIdValidation, CidadeController.getById)
router.put('/cidades/:id', CidadeController.updateByIdValidation, CidadeController.updateById)
router.delete('/cidades/:id', CidadeController.deleteByIdValidation, CidadeController.deleteById)

router.post('/pessoas', PessoaController.createValidation, PessoaController.create)
router.get('/pessoas', PessoaController.getAllValidation, PessoaController.getAll)
router.get('/pessoas/:id', PessoaController.getByIdValidation, PessoaController.getById)
router.put('/pessoas/:id', PessoaController.updateByIdValidation, PessoaController.updateById)
router.delete('/pessoas/:id', PessoaController.deleteByIdValidation, PessoaController.deleteById)

export { router }