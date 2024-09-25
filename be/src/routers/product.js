import { Router } from 'express';
import { CreateProduct, DeleteProduct, GetAllProduct, GetProductById, UpdateProduct } from '../controllers/product.js';
const Router_Product = Router();
Router_Product.post('/products', CreateProduct);
Router_Product.get('/products', GetAllProduct);
Router_Product.delete('/products/:id', DeleteProduct);
Router_Product.put('/products/:id', UpdateProduct);
Router_Product.get('/products/:id', GetProductById);
export default Router_Product;