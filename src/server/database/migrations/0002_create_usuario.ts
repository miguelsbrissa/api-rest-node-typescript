import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'

export async function up(knex: Knex) {
	return knex.schema.createTable(ETableNames.usuario, table => {
		table.bigIncrements('id').primary().index()
		table.string('nome').checkLength('>=', 3).notNullable()
		table.string('email').index().unique().checkLength('>=', 5).notNullable()
		table.string('senha').notNullable().checkLength('>=',6)
	}).then(() => {
		console.log(`# Create table ${ETableNames.usuario}`)
	})
}

export async function down(knex: Knex) {
	return knex.schema.dropTable(ETableNames.usuario).then(() => {
		console.log(`# Drop table ${ETableNames.usuario}`)
	})
}