import { StatusCodes } from 'http-status-codes/build/cjs/status-codes'
import { testServer } from '../jest.setup'

describe('Pessoas - DeleteById', () => {
	let accessToken = ''
	beforeAll(async () => {
		const email = 'pessoas@gmail.com'
		await testServer.post('/cadastrar')
			.send({ nome: 'Teste', email, senha: '123456' })
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

	it('Deleta registro', async () => {
		const res = await testServer
			.post('/pessoas')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({
				cidadeId,
				email: 'miguel@email.com',
				nomeCompleto: 'Miguel'
			})

		expect(res.statusCode).toEqual(StatusCodes.CREATED)

		const res1 = await testServer
			.delete('/pessoas/1')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT)
	})

	it('Tenta deletar registro sem token', async () => {
		const res = await testServer
			.post('/pessoas')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({
				cidadeId,
				email: 'miguel@email.com',
				nomeCompleto: 'Miguel'
			})

		expect(res.statusCode).toEqual(StatusCodes.CREATED)

		const res1 = await testServer
			.delete('/pessoas/1')
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
		expect(res1.body).toHaveProperty('errors.default')
	})

	it('Tenta deletar um registro com o id no formato errado', async () => {
		const res1 = await testServer
			.delete('/pessoas/Miguel')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.params.id')
	})

	it('Tenta deletar um registro que não existe', async () => {
		const res1 = await testServer
			.delete('/pessoas/6969696969')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
	})
})