import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { IPessoa } from '../../models'
import { PessoasProvider } from '../../providers'
import { validation } from '../../shared/middlewares'
interface IParamsProps {
	id?: number
}

export const updateByIdValidation = validation({
	body: yup.object().shape({
		nomeCompleto: yup.string().required().min(3),
		email: yup.string().required().email(),
		cidadeId: yup.number().required().integer().positive(),
	}),
	params: yup.object().shape({
		id: yup.number().integer().required().moreThan(0),
	})
})

export const updateById = async (req: Request<IParamsProps, {}, Omit<IPessoa, 'id'>>, res: Response) => {
	if (!req.params.id) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			errors: {
				default: 'O parâmetro "id" precisa ser informado.'
			}
		})
	}

	const result = await PessoasProvider.updateById(req.params.id, req.body)

	if(result instanceof Error){
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({errors: { default: result.message}})
	}else{
		return res.status(StatusCodes.NO_CONTENT).json(result)
	}
}