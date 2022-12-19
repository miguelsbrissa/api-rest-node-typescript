import { StatusCodes } from 'http-status-codes/build/cjs/status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - UpdateById', () => {

	it('Atualiza um registro', async () => {
		const res = await testServer
			.post('cidades')
			.send({
				nome: 'Itu'
			})
			
		expect(res.statusCode).toEqual(StatusCodes.CREATED)

		const res1 = await testServer
			.put('/cidades/1')
			.send({
				nome:'Salto'
			})

		expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT)
	})

	it('Tenta atualizar um registro com nome muito curto', async () => {
		const res1 = await testServer
			.put('/cidades/1')
			.send({
				nome:'I'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.body.nome')
	})

	it('Tenta atualizar um registro com o id no formato errado', async () => {
		const res1 = await testServer
			.put('/cidades/Itu')
			.send({
				nome:'I'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.params.id')
	})

	it('Tenta atualizar um registro que não existe', async () => {
		const res1 = await testServer
			.put('/cidades/6969696969')
			.send({
				nome:'I'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})
})