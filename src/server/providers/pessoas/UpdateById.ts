import { ETableNames } from '../../database/ETableNames'
import { Knex } from '../../database/knex'
import { IPessoa } from '../../models'

export const updateById = async (id:Number, pessoa: Omit<IPessoa, 'id'>): Promise<void | Error> => {
	try {
		const result = await Knex(ETableNames.pessoa)
			.where('id', '=', id)
			.update({
				nomeCompleto: pessoa.nomeCompleto,
				email: pessoa.email,
				cidadeId: pessoa.cidadeId
			})

		if (result > 0) return

		return new Error('Erro ao atualizar pessoa')
	} catch (error) {
		console.log(error)
		return new Error('Erro ao atualizar pessoa')
	}
}