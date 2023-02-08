import { ETableNames } from '../../database/ETableNames'
import { Knex } from '../../database/knex'
import { IUsuario } from '../../models'

export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {
	try {

		const [result] = await Knex(ETableNames.usuario).insert(usuario).returning('id')

		if (typeof result === 'object') {
			return result.id
		} else if (typeof result === 'number') {
			return result
		}

		return new Error('Erro ao cadastrar usuario')
	} catch (error) {
		console.log(error)
		return new Error('Erro ao cadastrar usuario')
	}
}