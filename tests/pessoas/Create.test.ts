import { StatusCodes } from 'http-status-codes/build/cjs/status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - Create', () => {
	let cidadeId: number | undefined = undefined
	beforeAll(async () => {
		const resCidade = await testServer
			.post('/cidades')
			.send({ nome: 'Teste' })

		cidadeId = resCidade.body
	})
	it('Cria registro', async () => {
		const res1 = await testServer
			.post('/pessoas')
			.send({
				cidadeId,
				email: 'miguel@email.com',
				nomeCompleto: 'Miguel'
			})

		expect(res1.statusCode).toEqual(StatusCodes.CREATED)
		expect(typeof res1.body).toEqual('number')
	})

	it('Tenta criar um registro com nome muito curto', async () => {
		const res1 = await testServer
			.post('/pessoas')
			.send({
				nome: 'I'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.body.nomeCompleto')
		expect(res1.body).toHaveProperty('errors.body.email')
		expect(res1.body).toHaveProperty('errors.body.cidadeId')
	})
})