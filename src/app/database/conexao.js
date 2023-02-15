import mysql from 'mysql'

const conexao = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Dprnss01@',
  database: 'api_node'
})

export const conn = (sql, valores='', mensagemRejeicao) => {
  return new Promise((resolve, reject) => {
    conexao.query(sql, valores,(erro, resultado) => {
      if (erro) return reject(mensagemRejeicao)
      const linha = JSON.parse(JSON.stringify(resultado))
      return resolve(linha)
    })
  })
}

conexao.connect()

export default conexao