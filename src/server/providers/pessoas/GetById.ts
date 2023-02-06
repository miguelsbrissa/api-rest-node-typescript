import { ETableNames } from '../../database/ETableNames'
import { Knex } from '../../database/knex'
import { IPessoa } from '../../models'

export const getById = async (id: number): Promise<IPessoa | Error> => {
	try {
		const result = await Knex(ETableNames.pessoa)
			.select()
			.where('id','=', id)
			.first()

		if (result) {
			return result
		}
		
		return new Error('Nenhuma pessoa encontrada')
	} catch (error) {
		console.log(error)
		return new Error('Nenhuma pessoa encontrada')
	}
}