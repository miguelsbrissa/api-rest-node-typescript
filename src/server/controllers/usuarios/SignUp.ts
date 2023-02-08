import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { IUsuario } from '../../models'
import { UsuariosProvider } from '../../providers'
import { validation } from '../../shared/middlewares'

export const signUpValidation = validation({
	body: yup.object().shape({
		nome: yup.string().required().min(3),
		email: yup.string().required().min(5).email(),
		senha: yup.string().required().min(6)
	}),
})

export const signUp = async (req: Request<{}, {},  Omit<IUsuario, 'id'>>, res: Response) => {
	const result = await UsuariosProvider.create(req.body)

	if(result instanceof Error){
		return res.status(StatusCodes.BAD_REQUEST).json({errors: { default: result.message}})
	}else{
		return res.status(StatusCodes.CREATED).json(result)
	}
}