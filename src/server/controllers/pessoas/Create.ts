import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { IPessoa } from '../../models'
import { PessoasProvider } from '../../providers'
import { validation } from '../../shared/middlewares'

export const createValidation = validation({
	body: yup.object().shape({
		nome: yup.string().required().min(3).max(150)
	}),
})

export const create = async (req: Request<{}, {},  Omit<IPessoa, 'id'>>, res: Response) => {
	const result = await PessoasProvider.create(req.body)

	if(result instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors: { default: result.message}})
	}else{
		return res.status(StatusCodes.CREATED).json(result)
	}
}