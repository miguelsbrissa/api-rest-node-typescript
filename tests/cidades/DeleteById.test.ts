import { StatusCodes } from 'http-status-codes/build/cjs/status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - DeleteById', () => {

	it('Deleta registro', async () => {
		const res = await testServer
			.post('cidades')
			.send({
				nome: 'Itu'
			})
			
		expect(res.statusCode).toEqual(StatusCodes.CREATED)

		const res1 = await testServer
			.delete('/cidades/1')
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT)
	})

	it('Tenta deletar um registro com o id no formato errado', async () => {
		const res1 = await testServer
			.delete('/cidades/Itu')
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.params.id')
	})

	it('Tenta deletar um registro que não existe', async () => {
		const res1 = await testServer
			.delete('/cidades/6969696969')
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})
})