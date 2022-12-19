import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { ICidade } from '../../models'
import { CidadesProvider } from '../../providers'
import { validation } from '../../shared/middlewares'

//Essa interface era usada para criar o schema do yup antes de criar o Middleware Validation generico para validação
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IFilter {
	filter?: string
}

export const createValidation = validation({
	body: yup.object().shape({
		nome: yup.string().required().min(3).max(150)
	}),
})

export const create = async (req: Request<{}, {},  Omit<ICidade, 'id'>>, res: Response) => {
	const result = await CidadesProvider.create(req.body)

	if(result instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors: { default: result.message}})
	}else{
		return res.status(StatusCodes.CREATED).json(result)
	}

	
}