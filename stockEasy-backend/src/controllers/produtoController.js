const Produto = require('../models/Produto');

// GET /api/produtos — listar todos
exports.listar = async (req, res, next) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    next(err);
  }
};

// GET /api/produtos/:id — buscar por id
exports.buscarPorId = async (req, res, next) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    next(err);
  }
};

// POST /api/produtos — criar
exports.criar = async (req, res, next) => {
  try {
    const novo = new Produto(req.body);
    const salvo = await novo.save();
    res.status(201).json(salvo);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ mensagem: 'Código de barras já cadastrado' });
    }
    next(err);
  }
};

// PUT /api/produtos/:id — atualizar
exports.atualizar = async (req, res, next) => {
  try {
    const atualizado = await Produto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!atualizado) return res.status(404).json({ mensagem: 'Produto não encontrado' });
    res.json(atualizado);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/produtos/:id — remover
exports.remover = async (req, res, next) => {
  try {
    const apagado = await Produto.findByIdAndDelete(req.params.id);
    if (!apagado) return res.status(404).json({ mensagem: 'Produto não encontrado' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};