import { StatusCodes } from 'http-status-codes/build/cjs/status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - Create', () => {
	let accessToken = ''
	beforeAll(async () => {
		const email = 'pessoas@gmail.com'
		await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' })
		const signInRes = await testServer.post('/login').send({ email, senha: '123456' })

		accessToken = signInRes.body.accessToken
	})
	let cidadeId: number | undefined = undefined
	beforeAll(async () => {
		const resCidade = await testServer
			.post('/cidades')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({ nome: 'Teste' })

		cidadeId = resCidade.body
	})

	it('Cria registro', async () => {
		const res1 = await testServer
			.post('/pessoas')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({
				cidadeId,
				email: 'miguel@email.com',
				nomeCompleto: 'Miguel'
			})

		expect(res1.statusCode).toEqual(StatusCodes.CREATED)
		expect(typeof res1.body).toEqual('number')
	})

	it('Tenta criar registro sem token', async () => {
		const res1 = await testServer
			.post('/pessoas')
			.send({
				cidadeId,
				email: 'miguel@email.com',
				nomeCompleto: 'Miguel'
			})

		expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
		expect(res1.body).toHaveProperty('errors.default')
	})

	it('Tenta criar um registro com nome muito curto', async () => {
		const res1 = await testServer
			.post('/pessoas')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({
				nome: 'I'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.body.nomeCompleto')
		expect(res1.body).toHaveProperty('errors.body.email')
		expect(res1.body).toHaveProperty('errors.body.cidadeId')
	})
})