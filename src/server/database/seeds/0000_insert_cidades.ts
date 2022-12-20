import { Knex } from 'knex'
import { ETableNames } from '../ETableNames'

export const seed = async (knex: Knex) => {
	const [{ count }] = await knex(ETableNames.cidade).count<[{ count: number }]>('* as count')

	if (!Number.isInteger(count) || Number(count) > 0) return

	const cidadesToInsert = cidadesSP.map(nomeCidade => ({ nome: nomeCidade }))

	await knex(ETableNames.cidade).insert(cidadesToInsert)
}

const cidadesSP = [
	'Adamantina',
	'Adolfo',
	'Aguaí',
	'Águas da Prata',
	'Águas de Lindóia',
	'Águas de Santa Bárbara',
	'Águas de São Pedro',
	'Agudos',
	'Alambari',
	'Alfredo Marcondes',
	'Altair',
	'Altinópolis',
	'Alto Alegre',
	'Alumínio',
	'Álvares Florence',
	'Álvares Machado',
	'Álvaro de Carvalho',
	'Alvinlândia',
	'Americana',
	'Américo Brasiliense',
	'Américo de Campos',
	'Amparo',
	'Analândia',
	'Andradina',
	'Angatuba',
	'Anhembi',
	'Anhumas',
	'Aparecida',
	'Aparecida d\'Oeste',
	'Apiaí',
	'Araçariguama',
	'Araçatuba',
	'Araçoiaba da Serra',
	'Aramina',
	'Arandu',
	'Arapeí',
	'Araraquara',
	'Araras',
	'Arco-Íris',
	'Arealva',
	'Areias',
	'Areiópolis',
	'Ariranha',
	'Artur Nogueira',
	'Arujá',
	'Aspásia',
	'Assis',
	'Atibaia',
	'Auriflama',
	'Avaí',
	'Avanhandava',
	'Avaré',
	'Bady Bassitt',
	'Balbinos'
]