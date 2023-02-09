import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { JWTService } from '../services'

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(StatusCodes.UNAUTHORIZED).json(
			{
				erros:
				{
					default:
						'Não autenticado'
				}
			})
	}

	const [type, token] = authorization.split(' ')

	if (type !== 'Bearer') {
		return res.status(StatusCodes.UNAUTHORIZED).json(
			{
				erros:
				{
					default:
						'Não autenticado'
				}
			})
	}

	const JWTData = JWTService.verify(token)
	if (JWTData === 'INVALID_TOKEN') {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
			{
				erros:
				{
					default:
						'Não autenticado'
				}
			})
	} else if (JWTData === 'JWT_SECRET_NOT_FOUND') {
		return res.status(StatusCodes.UNAUTHORIZED).json(
			{
				erros:
				{
					default:
						'Erro ao verificar o token'
				}
			})
	}
	console.log(JWTData)

	//passa o id do usuario para o header para que as controllers tenha acesso ao id do usuario
	req.headers.idUsuario = JWTData.uid.toString()
	return next()
}