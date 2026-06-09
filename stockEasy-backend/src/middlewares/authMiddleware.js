const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // pega o token do header Authorization: Bearer <token>
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensagem: 'Acesso negado — token não fornecido' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = decoded // disponibiliza os dados do usuário nas rotas
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ mensagem: 'Sessão expirada — faça login novamente' })
    }
    return res.status(401).json({ mensagem: 'Token inválido' })
  }
}