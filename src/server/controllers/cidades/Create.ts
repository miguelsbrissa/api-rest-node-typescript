import { Request, Response } from 'express'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'


interface ICidade {
	nome: string
	estado: string
}

//Essa interface era usada para criar o schema do yup antes de criar o Middleware Validation generico para validação
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IFilter {
	filter?: string
}

export const createValidation = validation({
	body: yup.object().shape({
		nome: yup.string().required().min(3),
		estado: yup.string().required().min(3)
	}),
	query: yup.object().shape({
		filter: yup.string().required().min(3),
	})
})

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
	console.log(req.body)

	return res.send('Cidade criada!')
}