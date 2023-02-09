import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { UsuariosProvider } from '../../providers'
import { validation } from '../../shared/middlewares'
import { JWTService, PasswordCrypto } from '../../shared/services'

interface IBodyProps {
	email?: string
	senha?: string
}

export const signInValidation = validation({
	body: yup.object().shape({
		email: yup.string().email().required().min(5),
		senha: yup.string().required().min(6),
	}),

})

export const signIn = async (req: Request<IBodyProps>, res: Response) => {
	if (!req.body.email) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			errors: {
				default: 'O parâmetro email precisa ser informado.'
			}
		})
	}

	if (!req.body.senha) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			errors: {
				default: 'O parâmetro senha precisa ser informado.'
			}
		})
	}

	const { email, senha } = req.body

	const usuario = await UsuariosProvider.getByEmail(email)

	if (usuario instanceof Error) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ errors: { default: 'E-mail e/ou senha incorretos' } })
	} else {
		const passMatch = await PasswordCrypto.verifyPassword(senha, usuario.senha)
		if (!passMatch)
			return res.status(StatusCodes.UNAUTHORIZED).json({ errors: { default: 'E-mail e/ou senha incorretos' } })

		const accessToken = JWTService.sign({ uid: usuario.id })
		if (accessToken === 'JWT_SECRET_NOT_FOUND') {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: 'Erro ao gerar o token de acesso' } })
		}

		return res.status(StatusCodes.OK).json({ accessToken: accessToken })
	}
}