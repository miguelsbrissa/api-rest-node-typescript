import { ETableNames } from '../../database/ETableNames'
import { Knex } from '../../database/knex'
import { IPessoa } from '../../models'

export const create = async (pessoa: Omit<IPessoa, 'id'>): Promise<number | Error> => {
	try {
		const [result] = await Knex(ETableNames.pessoa).insert(pessoa).returning('id')

		if(typeof result === 'object'){
			return result.id
		}else if(typeof result === 'number'){
			return result
		}

		return new Error('Erro ao cadastrar pessoa')
	} catch (error) {
		console.log(error)
		return new Error('Erro ao cadastrar pessoa')
	}
}