const Cliente = require('../models/Cliente');

exports.listar = async (req, res, next) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) { next(err); }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (err) { next(err); }
};

exports.criar = async (req, res, next) => {
  try {
    const novo = new Cliente(req.body);
    const salvo = await novo.save();
    res.status(201).json(salvo);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ mensagem: 'CPF/CNPJ já cadastrado' });
    next(err);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const atualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!atualizado) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    res.json(atualizado);
  } catch (err) { next(err); }
};

exports.remover = async (req, res, next) => {
  try {
    const apagado = await Cliente.findByIdAndDelete(req.params.id);
    if (!apagado) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    res.status(204).send();
  } catch (err) { next(err); }
};