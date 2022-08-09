import client from './../databse';
import { Order, OrderFront } from './order';
import { Product, ProductFront } from './product';

export type OrderProduct = {
    id?: number;
    quantity: number;
    order_id: number;
    product_id: number;
};

const orderStore = new OrderFront();
const productStore = new ProductFront();

export class OrderProductStore {
    async addToOrder(op: OrderProduct): Promise<OrderProduct> {
        const order = await orderStore.show(op.order_id);
        const product = await productStore.show(op.product_id);
        if (order === null || product === null) {
            throw new Error('order or product not found');
        }
        try {
            const sql =
                'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *;';
            const conn = await client.connect();
            const result = await conn.query(sql, [
                op.quantity,
                op.order_id,
                op.product_id,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can't add Product to Order ${err}`);
        }
    }

    async update(
        order_id: number,
        product_id: number,
        quantity: number
    ): Promise<OrderProduct> {
        try {
            const sql =
                'update order_products set quantity=($1) where order_id=($2) and product_id=($3) returning *;';
            const conn = await client.connect();
            const result = await conn.query(sql, [
                quantity,
                order_id,
                product_id,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can't update order-product ${err}`);
        }
    }

    async removeFromOrder(
        product_id: number,
        order_id: number
    ): Promise<OrderProduct> {
        try {
            const sql =
                'DELETE FROM order_products WHERE product_id=($1) AND order_id=($2) RETURNING *;';
            const conn = await client.connect();
            const result = await conn.query(sql, [product_id, order_id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can't delete procudt from order ${err}`);
        }
    }

    async getUserOrders(user_id: number): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1);';
            const conn = await client.connect();
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`can't get all orders for user ${err}`);
        }
    }

    async getUserActiveOrders(user_id: number): Promise<Order[]> {
        try {
            const sql =
                'SELECT * FROM orders WHERE user_id=($1) AND status=($2);';
            const conn = await client.connect();
            const result = await conn.query(sql, [user_id, 'active']);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`can't get active orders for user ${err}`);
        }
    }

    async getUserCompleteOrders(user_id: number): Promise<Order[]> {
        try {
            const sql =
                'SELECT * FROM orders WHERE user_id=($1) AND status=($2);';
            const conn = await client.connect();
            const result = await conn.query(sql, [user_id, 'complete']);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`can't get complete orders for user ${err}`);
        }
    }

    async getOrderProducts(order_id: number): Promise<Product[]> {
        try {
            const sql =
                'select products.id, products.name, products.price from products inner join order_products on products.id = order_products.product_id inner join orders on orders.id = order_products.order_id where orders.id=($1);';
            const conn = await client.connect();
            const result = await conn.query(sql, [order_id]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`can't get order products ${err}`);
        }
    }
}
