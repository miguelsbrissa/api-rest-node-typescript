import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { CidadesProvider } from '../../providers'
import { validation } from '../../shared/middlewares'

interface IParamsProps {
	id?: number
}

export const getByIdValidation = validation({
	params: yup.object().shape({
		id: yup.number().integer().required().moreThan(0),
	}),

})

export const getById = async (req: Request<IParamsProps>, res: Response) => {
	if (!req.params.id) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			errors: {
				default: 'O parâmetro "id" precisa ser informado.'
			}
		})
	}

	const result = await CidadesProvider.getById(req.params.id)

	if(result instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors: { default: result.message}})
	}else{
		return res.status(StatusCodes.OK).json(result)
	}
}