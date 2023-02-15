import express from 'express'
import PostController from './app/controllers/PostController.js';
const app = express();

//leitura do json
app.use(express.json());
//adicionar post
app.post("/posts", PostController.save);
//listar todas as posts
app.get("/posts", PostController.findAll);
//buscar post por ID
app.get("/posts/:id", PostController.findById);
//atualizar posts
app.put("/posts/:id", PostController.update);
//deletar posts
app.delete("/posts/:id", PostController.delete);

app.get('/', (request, response) => {
  response.send('Olá Mundo!')
})
  
export default app;