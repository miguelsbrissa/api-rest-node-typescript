import { StatusCodes } from 'http-status-codes/build/cjs/status-codes'
import { testServer } from '../jest.setup'

describe('Usuarios - SignUp', () => {

	it('Cria registro', async () => {
		const res1 = await testServer
			.post('/cadastrar')
			.send({
				nome: 'Teste',
				email: 'teste@email.com',
				senha: '123456'
			})

		expect(res1.statusCode).toEqual(StatusCodes.CREATED)
		expect(typeof res1.body).toEqual('number')
	})

	it('Tenta criar registro com email duplicado', async () => {
		await testServer
			.post('/cadastrar')
			.send({
				nome: 'Teste',
				email: 'teste@email.com',
				senha: '123456'
			})
		
		const res2 = await testServer
			.post('/cadastrar')
			.send({
				nome: 'Teste',
				email: 'teste@email.com',
				senha: '123456'
			})

		expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})

	it('Tenta criar um registro com nome muito curto', async () => {
		const res1 = await testServer
			.post('/cadastrar')
			.send({
				nome: 'T',
				email: 'teste@email.com',
				senha: '123456'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.body.nome')
	})

	it('Tenta criar um registro sem nome', async () => {
		const res1 = await testServer
			.post('/cadastrar')
			.send({
				email: 'teste@email.com',
				senha: '123456'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.body.nome')
	})

	it('Tenta criar um registro sem nome', async () => {
		const res1 = await testServer
			.post('/cadastrar')
			.send({
				nome: 'teste',
				senha: '123456'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.body.email')
	})

	it('Tenta criar um registro com email invalido', async () => {
		const res1 = await testServer
			.post('/cadastrar')
			.send({
				nome: 'Teste',
				email: 'teste',
				senha: '123456'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.body.email')
	})

	it('Tenta criar um registro com senha curta', async () => {
		const res1 = await testServer
			.post('/cadastrar')
			.send({
				nome: 'Teste',
				email: 'teste',
				senha: '12'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
		expect(res1.body).toHaveProperty('errors.body.senha')
	})
})