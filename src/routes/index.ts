import { Router } from 'express';
import usersApi from './api/users';
import productsApi from './api/products';
import orderApi from './api/orders';

const routes = Router();

routes.use('/users', usersApi);
routes.use('/products', productsApi);
routes.use('/orders', orderApi);

export default routes;
