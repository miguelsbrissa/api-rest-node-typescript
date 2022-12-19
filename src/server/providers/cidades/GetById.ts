import { ETableNames } from '../../database/ETableNames'
import { Knex } from '../../database/knex'
import { ICidade } from '../../models'

export const getById = async (id: number): Promise<ICidade | Error> => {
	try {
		const result = await Knex(ETableNames.cidade)
			.select()
			.where('id','=', id)
			.first()

		if (result) {
			return result
		}
		
		return new Error('Nenhuma cidade encontrada')
	} catch (error) {
		console.log(error)
		return new Error('Nenhuma cidade encontrada')
	}
}