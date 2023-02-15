import express from 'express'
const app = express()
app.use(express.json())

const posts = [
  {id : 1, titulo: 'Titulo Post 1', descricao: 'Descrição Post 1'},
  {id : 2, titulo: 'Titulo Post 2', descricao: 'Descrição Post 2'},
  {id : 3, titulo: 'Titulo Post 3', descricao: 'Descrição Post 3'},
]

function getPostId(id){
  return posts.filter(post=>post.id == id);
}

//buscar por id
app.get('/posts/:id', (request, response) => {
  //const linha = getPostId(request.params.id)
  //response.json(linha)
  response.json(posts.filter(post=>post.id == request.params.id))
})

//remover por id
app.delete('/posts/:id', (request, response) => {
  const id = request.params.id
  const index = posts.findIndex(post=>post.id == id)
  posts.splice(index,1)
  response.send('Post '+ id +' removido com sucesso!')
})

//atualizar por id
app.put('/posts/:id', (request, response) => {
  const id                = request.params.id
  const index             = posts.findIndex(post=>post.id == id)
  posts[index].titulo     = request.body.titulo
  posts[index].descricao  = request.body.descricao
  response.send(posts)
})

// listar todos
app.get('/posts', (request, response) => {
  response.send(posts)
})

// Adicionar
app.post('/posts', (request, response) => {
  posts.push(request.body)
  response.status(200).send('cadastrado com sucesso!')
})

// Olá mundo
app.get('/', (request, response) => {
  response.send('Olá Mundo!')
})

export default app