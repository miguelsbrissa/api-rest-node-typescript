import express from 'express'

const server = express()

server.get('/', (_, res) => {

	return res.send('Hello world!')
})

interface Teste {

}

export { server }