import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { CidadesProvider } from '../../providers'
import { validation } from '../../shared/middlewares'

interface IQueryProps {
	page?: number
	limit?: number
	filter?: string
}

export const getAllValidation = validation({
	query: yup.object().shape({
		page: yup.number().notRequired().moreThan(0),
		limit: yup.number().notRequired().moreThan(0),
		filter: yup.string().notRequired()
	}),
})

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
	const result = await CidadesProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filter || '')

	if(result instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors: { default: result.message}})
	}else{
		return res.status(StatusCodes.CREATED).json(result)
	}
}