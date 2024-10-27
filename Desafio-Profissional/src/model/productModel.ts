import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  value: number;
  quantity: number;
}

const productSchema = new Schema<IProduct>({
  name: { 
    type: String, 
    required: [true, 'O nome do produto é obrigatório.'], 
    trim: true 
  },
  value: { 
    type: Number, 
    required: [true, 'O valor do produto é obrigatório.'], 
    min: [0, 'O valor do produto deve ser positivo.'] 
  },
  quantity: { 
    type: Number, 
    required: [true, 'A quantidade do produto é obrigatória.'], 
    min: [0, 'A quantidade do produto deve ser zero ou maior.'] 
  },
});

export default model<IProduct>('Product', productSchema);
