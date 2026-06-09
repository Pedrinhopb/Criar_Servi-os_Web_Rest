const express    = require('express')
const router     = express.Router()
const controller = require('../controllers/configuracaoController')

// /api/configuracoes
router.get('/',  controller.listar)
router.put('/',  controller.salvar)

module.exports = router