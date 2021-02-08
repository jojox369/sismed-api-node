import { Router } from 'express'

const Routers = Router()

Routers.get('/', (request, response) => {
	response.send('Hello world')
})

export default Routers
