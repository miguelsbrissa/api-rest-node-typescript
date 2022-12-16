import { StatusCodes } from 'http-status-codes/build/cjs/status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - GetById', () => {

	it('Consulta um registro', async () => {
		const res = await testServer
			.post('cidades')
			.send({
				nome: 'Itu'
			})
			
		expect(res.statusCode).toEqual(StatusCodes.CREATED)

		const res1 = await testServer
			.get('/cidades/1')
			.send()
			
		expect(res1.statusCode).toEqual(StatusCodes.OK)
	})

	it('Tenta consultar um registro com o id no formato errado', async () => {
		const res1 = await testServer
			.get('/cidades/Itu')
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.params.id')
	})

	it('Tenta consultar um registro que não existe', async () => {
		const res1 = await testServer
			.get('/cidades/6969696969')
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})
})