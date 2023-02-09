import { StatusCodes } from 'http-status-codes/build/cjs/status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - GetById', () => {
	let accessToken = ''
	beforeAll(async () => {
		const email = 'create-cidades@gmail.com'
		await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' })
		const signInRes = await testServer.post('/login').send({ email, senha: '123456' })

		accessToken = signInRes.body.accessToken
	})
	it('Consulta um registro', async () => {
		const res = await testServer
			.post('/cidades')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({
				nome: 'Itu'
			})

		expect(res.statusCode).toEqual(StatusCodes.CREATED)

		const res1 = await testServer
			.get('/cidades/1')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.OK)
	})

	it('Tenta consultar um registro sem token', async () => {
		const res = await testServer
			.post('/cidades')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({
				nome: 'Itu'
			})

		expect(res.statusCode).toEqual(StatusCodes.CREATED)

		const res1 = await testServer
			.get('/cidades/1')
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
		expect(res1.body).toHaveProperty('errors.default')
	})

	it('Tenta consultar um registro com o id no formato errado', async () => {
		const res1 = await testServer
			.get('/cidades/Itu')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.params.id')
	})

	it('Tenta consultar um registro que não existe', async () => {
		const res1 = await testServer
			.get('/cidades/6969696969')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
	})
})