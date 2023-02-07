import { ETableNames } from '../../database/ETableNames'
import { Knex } from '../../database/knex'
import { IPessoa } from '../../models'

export const getAll = async (page: number, limit: number, filter: string): Promise<IPessoa[] | Error> => {
	try {
		const result = await Knex(ETableNames.pessoa)
			.select()
			.limit(limit)
			.where('id', '=', `%${filter}%`)
			.orWhere('nomeCompleto', 'like', `%${filter}%`)
			.offset((page - 1) * limit)

		return result

	} catch (error) {
		console.log(error)
		return new Error('Erro ao consultar pessoas')
	}
}