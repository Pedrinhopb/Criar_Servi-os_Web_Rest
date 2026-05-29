const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri, { family: 4 });
    console.log('✅ MongoDB conectado');
  } catch (err) {
    console.error('⚠️ MongoDB offline — rodando sem banco de dados');
    // não encerra o processo, deixa o servidor rodar
  }
};

module.exports = connectDB;