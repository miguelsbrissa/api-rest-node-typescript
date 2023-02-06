import { ETableNames } from '../../database/ETableNames'
import { Knex } from '../../database/knex'
import { IPessoa } from '../../models'

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IPessoa[] | Error> => {
	try {
		const result = await Knex(ETableNames.pessoa)
			.select()
			.limit(limit)
			.where('id', '=', Number(id))
			.orWhere('nome', 'like', `%${filter}%`)
			.offset((page - 1) * limit)

		if (id > 0 && result.every(item => item.id !== id)) {
			const resultById = await Knex(ETableNames.pessoa)
				.select('*')
				.where('id', '=', id)
				.first()

			if (resultById) return [...result, resultById]
		}

		return result

	} catch (error) {
		console.log(error)
		return new Error('Erro ao consultar pessoas')
	}
}