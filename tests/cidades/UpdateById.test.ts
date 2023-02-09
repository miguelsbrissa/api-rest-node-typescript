import { StatusCodes } from 'http-status-codes/build/cjs/status-codes'
import { testServer } from '../jest.setup'

describe('Cidades - UpdateById', () => {
	let accessToken = ''
	beforeAll(async () => {
		const email = 'create-cidades@gmail.com'
		await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' })
		const signInRes = await testServer.post('/login').send({ email, senha: '123456' })

		accessToken = signInRes.body.accessToken
	})
	it('Atualiza um registro', async () => {
		const res = await testServer
			.post('/cidades')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({
				nome: 'Itu'
			})

		expect(res.statusCode).toEqual(StatusCodes.CREATED)

		const res1 = await testServer
			.put('/cidades/1')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({
				nome: 'Salto'
			})

		expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT)
	})

	it('Tenta atualizar um registro sem token', async () => {
		const res = await testServer
			.post('/cidades')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({
				nome: 'Itu'
			})

		expect(res.statusCode).toEqual(StatusCodes.CREATED)

		const res1 = await testServer
			.put('/cidades/1')
			.send({
				nome: 'Salto'
			})

		expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
		expect(res1.body).toHaveProperty('errors.default')
	})

	it('Tenta atualizar um registro com nome muito curto', async () => {
		const res1 = await testServer
			.put('/cidades/1')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({
				nome: 'I'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.body.nome')
	})

	it('Tenta atualizar um registro com o id no formato errado', async () => {
		const res1 = await testServer
			.put('/cidades/Itu')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({
				nome: 'I'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.params.id')
	})

	it('Tenta atualizar um registro que não existe', async () => {
		const res1 = await testServer
			.put('/cidades/6969696969')
			.set({ Authorization: `Bearer ${accessToken}` })
			.send({
				nome: 'I'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})
})