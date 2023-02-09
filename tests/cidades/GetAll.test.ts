import { StatusCodes } from 'http-status-codes/build/cjs/status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - GetAll', () => {
	let accessToken = ''
	beforeAll(async () => {
		const email = 'create-cidades@gmail.com'
		await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' })
		const signInRes = await testServer.post('/login').send({ email, senha: '123456' })

		accessToken = signInRes.body.accessToken
	})
	it('Consulta todos os registros', async () => {
		const res = await testServer
			.post('/cidades')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({
				nome: 'Itu'
			})

		expect(res.statusCode).toEqual(StatusCodes.CREATED)

		const res1 = await testServer
			.get('/cidades')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send()

		expect(Number(res1.header['x-total-count'])).toBeGreaterThan(0)
		expect(res1.statusCode).toEqual(StatusCodes.OK)
		expect(res1.body.length).toBeGreaterThan(0)
	})

	it('Tenta consultar todos os registros sem token', async () => {
		const res = await testServer
			.post('/cidades')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({
				nome: 'Itu'
			})

		expect(res.statusCode).toEqual(StatusCodes.CREATED)

		const res1 = await testServer
			.get('/cidades')
			.send()

		expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
		expect(res1.body).toHaveProperty('errors.default')
	})

	it('Tenta consultar resgistros com query no formato errado', async () => {
		const res1 = await testServer
			.get('/cidades?page=asd&limit=asd&filter=13')
			.set({ Authorization: `Bearer ${accessToken}` })

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.query')
	})

	it('Tenta consultar resgistros com query com valores errado', async () => {
		const res1 = await testServer
			.get('/cidades?page=0&limit=-1&filter=Rio')
			.set({ Authorization: `Bearer ${accessToken}` })

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.query')
	})
})