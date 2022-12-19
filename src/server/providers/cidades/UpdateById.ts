import { ETableNames } from '../../database/ETableNames'
import { Knex } from '../../database/knex'
import { ICidade } from '../../models'

export const updateById = async (id:Number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {
	try {
		const result = await Knex(ETableNames.cidade)
			.where('id', '=', id)
			.update({
				nome: cidade.nome
			})

		if (result > 0) return

		return new Error('Erro ao atualizar cidade')
	} catch (error) {
		console.log(error)
		return new Error('Erro ao atualizar cidade')
	}
}