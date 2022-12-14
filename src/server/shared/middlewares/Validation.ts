import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import {SchemaOf, ValidationError} from 'yup'
import './../../shared/services/TranslationsYup'

type TProperty = 'body' | 'header' | 'params' | 'query'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAllSchemas = Record<TProperty, SchemaOf<any>>
type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler

export const validation:TValidation = (schemas) => async (req, res, next) => {
	const errorsResult: Record<string, Record<string, string>> = {}

	Object.entries(schemas).forEach(([key, schema]) => {
		try {
			schema.validateSync(req[key as TProperty], { abortEarly: false })
		} catch (err) {
			const yupError = err as ValidationError
			const errors: Record<string, string> = {}
	
			yupError.inner.forEach(error => {
				if (!error.path) return
	
				errors[error.path] = error.message
			})
			
			errorsResult[key] = errors
		}
	})

	if (Object.entries(errorsResult).length === 0){
		return next()
	}else{
		return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult })
	}
}