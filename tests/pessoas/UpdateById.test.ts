import { StatusCodes } from 'http-status-codes/build/cjs/status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - UpdateById', () => {
	let cidadeId: number | undefined = undefined
	beforeAll(async () => {
		const resCidade = await testServer
			.post('/cidades')
			.send({ nome: 'Teste' })

		cidadeId = resCidade.body
	})
	it('Atualiza um registro', async () => {
		const res = await testServer
			.post('/pessoas')
			.send({
				cidadeId,
				email: 'miguel@email.com',
				nomeCompleto: 'Miguel'
			})

		expect(res.statusCode).toEqual(StatusCodes.CREATED)

		const res1 = await testServer
			.put('/pessoas/1')
			.send({
				nomeCompleto: 'Rafael',
				email: 'rafael@email.com',
				cidadeId
			})

		expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT)
	})

	it('Tenta atualizar um registro com nome muito curto', async () => {
		const res1 = await testServer
			.put('/pessoas/1')
			.send({
				nomeCompleto: 'R',
				email: 'rafael@email.com',
				cidadeId: 11
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.body.nomeCompleto')
	})

	it('Tenta atualizar um registro com o id no formato errado', async () => {
		const res1 = await testServer
			.put('/pessoas/Itu')
			.send({
				nomeCompleto: 'Rafael',
				email: 'rafael@email.com',
				cidadeId: 11
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.params.id')
	})

	it('Tenta atualizar um registro que não existe', async () => {
		const res1 = await testServer
			.put('/pessoas/6969696969')
			.send({
				nomeCompleto: 'Rafael',
				email: 'rafael@email.com',
				cidadeId: 11
			})

		expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
	})
})