require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express        = require('express');
const cors           = require('cors');
const connectDB      = require('./config/db');
const logMiddleware  = require('./middlewares/logMiddleware');

const usuariosRouter     = require('./routes/usuarios');
const produtosRouter     = require('./routes/produtos');
const fornecedoresRouter = require('./routes/fornecedores');
const clientesRouter     = require('./routes/clientes');

const app  = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(logMiddleware);

app.use('/api/usuarios',     usuariosRouter);
app.use('/api/produtos',     produtosRouter);
app.use('/api/fornecedores', fornecedoresRouter);
app.use('/api/clientes',     clientesRouter);

app.get('/', (req, res) => {
  res.json({ mensagem: '🚀 API StockEasy funcionando!' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Algo deu errado no servidor' });
});

app.listen(PORT, () => {
  console.log(`🟢 Servidor rodando na porta ${PORT}`);
});