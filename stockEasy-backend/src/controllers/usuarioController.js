const Usuario = require('../models/Usuario');

// GET /api/usuarios — listar todos
exports.listar = async (req, res, next) => {
  try {
    const usuarios = await Usuario.find().select('-senha'); // não retorna a senha
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

// GET /api/usuarios/:id — buscar por id
exports.buscarPorId = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-senha');
    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    next(err);
  }
};

// POST /api/usuarios — criar
exports.criar = async (req, res, next) => {
  try {
    const novo = new Usuario(req.body);
    const salvo = await novo.save();
    const { senha, ...semSenha } = salvo.toObject();
    res.status(201).json(semSenha);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ mensagem: 'E-mail já cadastrado' });
    }
    next(err);
  }
};

// PUT /api/usuarios/:id — atualizar
exports.atualizar = async (req, res, next) => {
  try {
    const atualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-senha');
    if (!atualizado) return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    res.json(atualizado);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/usuarios/:id — remover
exports.remover = async (req, res, next) => {
  try {
    const apagado = await Usuario.findByIdAndDelete(req.params.id);
    if (!apagado) return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};