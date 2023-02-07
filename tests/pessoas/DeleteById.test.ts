import { StatusCodes } from 'http-status-codes/build/cjs/status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - DeleteById', () => {
	let cidadeId: number | undefined = undefined
	beforeAll(async () => {
		const resCidade = await testServer
			.post('/cidades')
			.send({ nome: 'Teste' })

		cidadeId = resCidade.body
	})

	it('Deleta registro', async () => {
		const res = await testServer
			.post('/pessoas')
			.send({
				cidadeId,
				email: 'miguel@email.com',
				nomeCompleto: 'Miguel'
			})
			
		expect(res.statusCode).toEqual(StatusCodes.CREATED)

		const res1 = await testServer
			.delete('/pessoas/1')
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT)
	})

	it('Tenta deletar um registro com o id no formato errado', async () => {
		const res1 = await testServer
			.delete('/pessoas/Miguel')
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.params.id')
	})

	it('Tenta deletar um registro que não existe', async () => {
		const res1 = await testServer
			.delete('/pessoas/6969696969')
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
	})
})