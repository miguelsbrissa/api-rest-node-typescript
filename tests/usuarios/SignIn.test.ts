import { StatusCodes } from 'http-status-codes/build/cjs/status-codes'
import { testServer } from '../jest.setup'

describe('Usuarios - SignIn', () => {
	beforeAll(async () => {
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

	it('Faz login correto', async () => {
		const res = await testServer
			.post('/login')
			.send({
				email: 'teste@email.com',
				senha: '123456'
			})

		expect(res.statusCode).toEqual(StatusCodes.OK)
	})

	it('Faz login com senha incorreta', async () => {
		const res1 = await testServer
			.post('/login')
			.send({
				email: 'teste@email.com',
				senha: '12345611'
			})

		expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
	})

	it('Faz login com e-mail incorreto', async () => {
		const res1 = await testServer
			.post('/login')
			.send({
				email: 'teste1@email.com',
				senha: '12345611'
			})

		expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
	})

	it('Faz login com e-mail com formato incorreto', async () => {
		const res1 = await testServer
			.post('/login')
			.send({
				email: 'teste1',
				senha: '12345611'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})

	it('Faz login com senha com formato incorreto', async () => {
		const res1 = await testServer
			.post('/login')
			.send({
				email: 'teste1',
				senha: '12'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})

	it('Faz login sem e-mail', async () => {
		const res1 = await testServer
			.post('/login')
			.send({
				senha: '12345611'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})

	it('Faz login sem senha', async () => {
		const res1 = await testServer
			.post('/login')
			.send({
				email: 'teste1'
			})

		expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})
})