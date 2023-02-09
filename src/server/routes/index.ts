import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import 'dotenv/config'
import { CidadeController, PessoaController, UsuarioController } from '../controllers'
import { ensureAuthenticated } from '../shared/middlewares'


const router = Router()

router.get('/', (_, res) => {

	return res.status(StatusCodes.ACCEPTED).send('Hello World')
})


router.post('/cidades', ensureAuthenticated, CidadeController.createValidation, CidadeController.create)
router.get('/cidades', ensureAuthenticated, CidadeController.getAllValidation, CidadeController.getAll)
router.get('/cidades/:id', ensureAuthenticated, CidadeController.getByIdValidation, CidadeController.getById)
router.put('/cidades/:id', ensureAuthenticated, CidadeController.updateByIdValidation, CidadeController.updateById)
router.delete('/cidades/:id', ensureAuthenticated, CidadeController.deleteByIdValidation, CidadeController.deleteById)

router.post('/pessoas', ensureAuthenticated, PessoaController.createValidation, PessoaController.create)
router.get('/pessoas', ensureAuthenticated, PessoaController.getAllValidation, PessoaController.getAll)
router.get('/pessoas/:id', ensureAuthenticated, PessoaController.getByIdValidation, PessoaController.getById)
router.put('/pessoas/:id', ensureAuthenticated, PessoaController.updateByIdValidation, PessoaController.updateById)
router.delete('/pessoas/:id', ensureAuthenticated, PessoaController.deleteByIdValidation, PessoaController.deleteById)

router.post('/login', UsuarioController.signInValidation, UsuarioController.signIn)
router.post('/cadastrar', UsuarioController.signUpValidation, UsuarioController.signUp)

export { router }