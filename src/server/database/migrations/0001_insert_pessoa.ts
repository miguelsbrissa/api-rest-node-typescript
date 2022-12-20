import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'

export async function up(knex: Knex) {
	return knex.schema.createTable(ETableNames.pessoa, table => {
		table.bigIncrements('id').primary().index()
		table.string('nomeCompleto').index().notNullable()
		table.string('email').notNullable().unique()
		table.bigInteger('cidadeId').references('id').inTable(ETableNames.cidade).index().notNullable()
			.onUpdate('CASCADE')
			.onDelete('RESTRICT')

		table.comment('Tabela para armazenar as pessoas do sistema.')
	}).then(() => {
		console.log(`# Create table ${ETableNames.pessoa}`)
	})
}

export async function down(knex: Knex) {
	return knex.schema.dropTable(ETableNames.pessoa).then(() => {
		console.log(`# Drop table ${ETableNames.pessoa}`)
	})
}