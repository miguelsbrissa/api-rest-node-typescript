import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'

export async function up(knex: Knex) {
	return knex.schema.createTable(ETableNames.cidade, table => {
		table.bigIncrements('id').primary().index()
		table.string('nome', 150).index().notNullable().checkLength('<=', 150)

		table.comment('Tabela para armazenar as cidades do sistema.')
	}).then(() => {
		console.log(`# Create table ${ETableNames.cidade}`)
	})
}
export async function down(knex: Knex) {
	return knex.schema.dropTable(ETableNames.cidade).then(() => {
		console.log(`# Create table ${ETableNames.cidade}`)
	})
}