import express from 'express'
const app = express()

app.get('/', (request, response) => {
  response.send('Olá Mundo!')
})

export default app