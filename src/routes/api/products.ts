import verifyAuthToken from '../../middlewares/verifytoken';
import { Router } from 'express';
import {
    index,
    create,
    show,
    update,
    deleteProduct,
} from '../../handlers/products';

const productsApi = Router();

productsApi.get('/', index);
productsApi.get('/:id', show);
productsApi.delete('/:id', verifyAuthToken, deleteProduct);
productsApi.post('/', verifyAuthToken, create);
productsApi.put('/:id', verifyAuthToken, update);

export default productsApi;
