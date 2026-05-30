const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri, {
      family: 4,
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });
    console.log('✅ MongoDB conectado');
  } catch (err) {
    console.error('⚠️ MongoDB offline — tentando reconectar em 5s...');
    setTimeout(connectDB, 5000); // tenta reconectar a cada 5 segundos
  }
};

module.exports = connectDB;