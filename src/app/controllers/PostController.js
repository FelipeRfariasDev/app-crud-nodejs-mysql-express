import PostRepository from '../repositories/PostRepository.js';

class PostController {

  async save(req, res) {
    const post = req.body;
    const linha = await PostRepository.save(post).catch(error => { res.json(error) })
    
    if(linha.affectedRows){
      res.json(post)
    }
  }

  async findAll(req, res) {
    const linha = await PostRepository.findAll().catch(error => { res.json(error) })
    res.json(linha)
  }

  async findById(req, res) {
    const id = req.params.id;
    const linha = await PostRepository.findById(id).catch(error => { res.json(error) })
    res.json(linha)
  }

  async update(req, res) {
    const post = req.body;
    const id = req.params.id;
    const linha = await PostRepository.update(post, id).catch(error => { res.json(error) })
    if(linha.affectedRows){
      res.json(post)
    }
    if(linha.affectedRows==0){
      res.json('Post '+id+' não encontrado!')
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    const linha = await PostRepository.delete(id).catch(error => { res.json(error) })

    if(linha.affectedRows){
      res.json('Post '+id+' removido com sucesso!')
    }
    if(linha.affectedRows==0){
      res.json('Post '+id+' não encontrado!')
    }
  }
}

export default new PostController