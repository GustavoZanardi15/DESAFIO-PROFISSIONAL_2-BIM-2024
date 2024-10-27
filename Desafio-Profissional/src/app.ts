import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes';

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado ao MongoDB com sucesso.');
})
.catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});


app.use(express.json());

app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
