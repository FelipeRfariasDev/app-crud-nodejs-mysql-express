import express from 'express'
const app = express()
const PORT = 3000

app.get('/', (request, response) => {
  response.send('Olá Mundo!')
})

app.listen(PORT, () => {
  console.log(`Aplicativo de exemplo ouvindo em http://localhost:${PORT}/`)
})