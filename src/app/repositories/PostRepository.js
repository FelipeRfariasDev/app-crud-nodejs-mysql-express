import { conn } from '../database/conexao.js';

class PostRepository {

  save(post) {
    const sql = "INSERT INTO posts SET ?";
    return conn(sql, post, 'Nao foi possivel criar')
  }

  findAll() {
    const sql = "SELECT * FROM posts";
    return conn(sql, 'Nao foi possivel listar')
    
  }

  findById(id) {
    const sql = "SELECT * FROM posts WHERE id=? ";
    return conn(sql, id, 'Nao foi possivel listar post '+id)
  }

  update(post, id) {
    const sql = "UPDATE posts SET ? WHERE id=? ";
    return conn(sql, [post, id], 'Nao foi possivel atualizar post'+id)
  }

  delete(id) {
    const sql = "DELETE FROM posts WHERE id=? ";
    return conn(sql, id, 'Nao foi possivel deletar post '+id)
  }
}

export default new PostRepository();