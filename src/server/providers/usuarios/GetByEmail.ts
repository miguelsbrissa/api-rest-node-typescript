import { ETableNames } from '../../database/ETableNames'
import { Knex } from '../../database/knex'
import { IUsuario } from '../../models'

export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
	try {
		const result = await Knex(ETableNames.usuario)
			.select()
			.where('email','=', email)
			.first()

		if (result) {
			return result
		}
		
		return new Error('Nenhum usuario encontrado')
	} catch (error) {
		console.log(error)
		return new Error('Nenhum usuario encontrado')
	}
}