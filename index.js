import app from './src/app.js'
const PORT = 3000

//escutador de servidor

app.listen(PORT, () => {
  console.log(`Servidor rodando em Http://localhost:${PORT}`)
})