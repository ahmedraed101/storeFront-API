import verifyAuthToken from '../../middlewares/verifytoken';
import { Router } from 'express';
import {
    createOrder,
    show,
    getUserOrders,
    index,
    getUserActiveOrders,
    getUserCompleteOrders,
    getOrderProducts,
    removeFromOrder,
    updateOrderProduct,
    addToOrder,
    deleteOrder,
    update,
} from '../../handlers/orders';

const ordersApi = Router();

ordersApi.get('/', index);
// actions with user_id
ordersApi.post('/:user_id', verifyAuthToken, createOrder);
ordersApi.get('/:user_id/all', verifyAuthToken, getUserOrders);
ordersApi.get('/:user_id/active', verifyAuthToken, getUserActiveOrders);
ordersApi.get('/:user_id/complete', verifyAuthToken, getUserCompleteOrders);
// actions with order_id
ordersApi.get('/:order_id', verifyAuthToken, show);
ordersApi.delete('/:order_id', verifyAuthToken, deleteOrder);
ordersApi.put('/:order_id', verifyAuthToken, update);
ordersApi.get('/:order_id/products', verifyAuthToken, getOrderProducts);
ordersApi.post('/:order_id/products', verifyAuthToken, addToOrder);
ordersApi.put('/:order_id/products', verifyAuthToken, updateOrderProduct);
ordersApi.delete('/:order_id/products', verifyAuthToken, removeFromOrder);

export default ordersApi;
