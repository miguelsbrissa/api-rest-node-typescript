import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'


interface ICidade {
	nome: string
}
interface IParamsProps {
	id?: number
}

export const updateByIdValidation = validation({
	body: yup.object().shape({
		nome: yup.string().required().min(3)
	}),
	params: yup.object().shape({
		id: yup.number().integer().required().moreThan(0),
	})
})

export const updateById = async (req: Request<IParamsProps, {}, ICidade>, res: Response) => {
	console.log(req.body)
	console.log(req.params)

	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado')
}