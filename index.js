const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_DATABASE = process.env.DB_DATABASE
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD


app.use(cors())
app.use(express.json())

//escutador de servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em Http://localhost:${PORT}`)
})

//http://localhost:3000/posts/ GET
app.get('/posts', async (req, res) => {
  const linha = await getAll().catch(error => { res.json(error) })
  res.json({
    'data':linha
  })
})
async function getAll() {
  const sql = "SELECT * FROM posts"
  return conn(sql, 'Nao foi possivel listar')
}

//http://localhost:3000/posts/ POST
app.post('/posts', async (req, res) => {
  const post = req.body
  const linha = await save(post).catch(error => { res.json(error) })
  if(linha.affectedRows){
    res.json(post)
  }
})
async function save(post) {
  const sql = "INSERT INTO posts SET ?"
  return conn(sql, post, 'Nao foi possivel criar')
}

//http://localhost:3000/posts/ PUT
app.put('/posts/:id', async (req, res) => {
  const post = req.body
    const id = req.params.id
    const linha = await put(post, id).catch(error => { res.json(error) })
    if(linha.affectedRows){
      res.json(post)
    }
    if(linha.affectedRows==0){
      res.json('Post '+id+' não encontrado!')
    }
})
async function put(post, id) {
  const sql = "UPDATE posts SET ? WHERE id=? "
    return conn(sql, [post, id], 'Nao foi possivel atualizar post'+id)
}

//http://localhost:3000/posts/ DELETE
app.delete('/posts/:id', async (req, res) => {
  const id = req.params.id
  const linha = await excluir(id).catch(error => { res.json(error) })

  if(linha.affectedRows){
    res.json('Post '+id+' removido com sucesso!')
  }
  if(linha.affectedRows==0){
    res.json('Post '+id+' não encontrado!')
  }
})
async function excluir(id) {
  const sql = "DELETE FROM posts WHERE id=? "
  return conn(sql, id, 'Nao foi possivel deletar post '+id)
}

//http://localhost:3000/posts/:id GET
app.get('/posts/:id', async (req, res) => {
  const id = req.params.id
  const linha = await getFindId(id).catch(error => { res.json(error) })
  res.json({
    'data':linha
  })
})
async function getFindId(id) {
  const sql = "SELECT * FROM posts WHERE id=? "
  return conn(sql, id, 'Nao foi possivel listar post '+id)
}

const conexao = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE
})

const conn = (sql, valores='', mensagemRejeicao) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, valores,(erro, resultado) => {
      if (erro) return reject(mensagemRejeicao)
      const linha = JSON.parse(JSON.stringify(resultado))
      return resolve(linha)
    })
  })
}

conexao.connect()