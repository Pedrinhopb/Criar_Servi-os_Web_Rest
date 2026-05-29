const Fornecedor = require('../models/Fornecedor');

exports.listar = async (req, res, next) => {
  try {
    const fornecedores = await Fornecedor.find();
    res.json(fornecedores);
  } catch (err) { next(err); }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const fornecedor = await Fornecedor.findById(req.params.id);
    if (!fornecedor) return res.status(404).json({ mensagem: 'Fornecedor não encontrado' });
    res.json(fornecedor);
  } catch (err) { next(err); }
};

exports.criar = async (req, res, next) => {
  try {
    const novo = new Fornecedor(req.body);
    const salvo = await novo.save();
    res.status(201).json(salvo);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ mensagem: 'CNPJ já cadastrado' });
    next(err);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const atualizado = await Fornecedor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!atualizado) return res.status(404).json({ mensagem: 'Fornecedor não encontrado' });
    res.json(atualizado);
  } catch (err) { next(err); }
};

exports.remover = async (req, res, next) => {
  try {
    const apagado = await Fornecedor.findByIdAndDelete(req.params.id);
    if (!apagado) return res.status(404).json({ mensagem: 'Fornecedor não encontrado' });
    res.status(204).send();
  } catch (err) { next(err); }
};