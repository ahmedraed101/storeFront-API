import { Request, Response } from 'express';
import { Order, Status, OrderFront } from './../models/order';
import { OrderProduct, OrderProductStore } from '../models/order-product';

const orderStore = new OrderFront();
const store = new OrderProductStore();

export const index = async (_req: Request, res: Response): Promise<void> => {
    const orders = await orderStore.index();
    res.json(orders);
};

export const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const order_id = req.params.order_id as unknown as number;
        const order = await orderStore.show(order_id);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const createOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const order: Order = {
            status: req.body.status,
            user_id: req.params.user_id as unknown as number,
        };
        const newOrder = await orderStore.create(order);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const order_id = req.params.order_id as unknown as number;
        const status = req.body.status as Status;
        const newOrder = await orderStore.update(order_id, status);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const deleteOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const order_id = req.params.order_id as unknown as number;
        const order = await orderStore.delete(order_id);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const addToOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const orderProduct: OrderProduct = {
            quantity: req.body.quantity,
            order_id: req.params.order_id as unknown as number,
            product_id: req.body.product_id as unknown as number,
        };
        const newOrder = await store.addToOrder(orderProduct);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const updateOrderProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const order_id = req.params.order_id as unknown as number;
        const product_id = req.body.product_id as unknown as number;
        const quantity = req.body.quantity as unknown as number;
        const newOrder = await store.update(order_id, product_id, quantity);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const removeFromOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const order_id = req.params.order_id as unknown as number;
        const product_id = req.body.product_id as unknown as number;
        const deleted = await store.removeFromOrder(product_id, order_id);
        res.json(deleted);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const getUserOrders = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user_id = req.params.user_id as unknown as number;
        const orders = await store.getUserOrders(user_id);
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const getUserActiveOrders = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user_id = req.params.user_id as unknown as number;
        const orders = await store.getUserActiveOrders(user_id);
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const getUserCompleteOrders = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user_id = req.params.user_id as unknown as number;
        const orders = await store.getUserCompleteOrders(user_id);
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

export const getOrderProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const order_id = req.params.order_id as unknown as number;
        const products = await store.getOrderProducts(order_id);
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};
