import { Request, Response } from 'express';
import ProductModel from '../model/productModel';
import { ProductException } from '../exception/productException';
import { validateOrReject } from 'class-validator';
import { ProductDtos } from '../dtos/productDtos';


export const fetchAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
};


export const fetchProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) throw new ProductException('Produto não encontrado');
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error instanceof ProductException ? error.message : 'Erro ao buscar o produto.' });
  }
};


export const modifyProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) throw new ProductException('Produto não encontrado');
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error instanceof ProductException ? error.message : 'Erro ao atualizar o produto.' });
  }
};


export const removeProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) throw new ProductException('Produto não encontrado');
    res.status(200).json({ message: 'Produto deletado com sucesso.', product: deletedProduct });
  } catch (error) {
    res.status(400).json({ error: error instanceof ProductException ? error.message : 'Erro ao deletar o produto.' });
  }
};
