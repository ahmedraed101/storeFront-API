import { OrderProductStore } from './../../models/order-product';
import { UserFront } from './../../models/user';
import { ProductFront } from './../../models/product';
import { OrderFront } from './../../models/order';
import client from './../../databse';

let id = 1;
const status = 'active';
let user_id: number;
let order_id: number;
let product_id: number;

const quantity = 1;
const new_quantity = 2;

const firstname = 'ahmed';
const lastname = 'raed';
const email = 'ahmed@raed.com';
const password = 'Password';

describe('OrderProduct model tests', () => {
    const store = new OrderProductStore();
    const userStore = new UserFront();
    const productStore = new ProductFront();
    const orderStore = new OrderFront();

    describe('have methods', () => {
        it('should have addToOrder method', () => {
            expect(store.addToOrder).toBeDefined();
        });

        it('should have removeFromOrder method', () => {
            expect(store.removeFromOrder).toBeDefined();
        });

        it('should have getUserOrders method', () => {
            expect(store.getUserOrders).toBeDefined();
        });

        it('should have update method', () => {
            expect(store.update).toBeDefined();
        });

        it('should have getUserActiveOrders method', () => {
            expect(store.getUserActiveOrders).toBeDefined();
        });

        it('should have getUserCompleteOrders method', () => {
            expect(store.getUserCompleteOrders).toBeDefined();
        });

        it('should have getOrderProducts method', () => {
            expect(store.getOrderProducts).toBeDefined();
        });
    });

    describe('methods should work', () => {
        it('addToOrder method should add a user', async (): Promise<void> => {
            const result = await store.addToOrder({
                quantity,
                order_id,
                product_id,
            });

            id = result.id as unknown as number;

            expect(result.quantity as number).toEqual(quantity);
            expect(result.id as number).toEqual(id);
        });

        it('getUserOrders method should return a list of users', async (): Promise<void> => {
            const result = await store.getUserOrders(user_id);

            expect(result.length).toBeGreaterThan(0);
        });

        it('getOrderProducts method should return a user', async (): Promise<void> => {
            const result = await store.getOrderProducts(order_id);

            expect(result.length).toBeGreaterThan(0);
        });

        it('update method should return an updated user', async (): Promise<void> => {
            const result = await store.update(
                order_id,
                product_id,
                new_quantity
            );

            expect(result.quantity).toEqual(new_quantity);
            expect(result.id as number).toEqual(id);
        });

        it('removeFromOrder method should return the deleted item from database', async (): Promise<void> => {
            const deltedOrderProduct = await store.removeFromOrder(
                product_id,
                order_id
            );
            expect(deltedOrderProduct.id as number).toEqual(id);
            // const result = await store.getUserOrders(user_id);
            // expect(result).toEqual([]);
        });
    });

    beforeAll(async (): Promise<void> => {
        const user = await userStore.create({
            firstname,
            lastname,
            email,
            password,
        });
        user_id = user.id as unknown as number;
        const order = await orderStore.create({
            status,
            user_id,
        });
        order_id = order.id as unknown as number;
        const product = await productStore.create({
            name: 'keys',
            price: 200,
            category: 'new',
        });
        product_id = product.id as unknown as number;
    });

    afterAll(async (): Promise<void> => {
        await orderStore.delete(order_id);
        await productStore.delete(product_id);
        await userStore.delete(user_id);
        const conn = await client.connect();
        const sql = 'alter sequence orders_id_seq restart;';
        const sql2 = 'alter sequence users_id_seq restart;';
        const sql3 = 'alter sequence products_id_seq restart;';
        const sql4 = 'alter sequence order_products_id_seq restart;';
        await conn.query(sql);
        await conn.query(sql2);
        await conn.query(sql3);
        await conn.query(sql4);
        conn.release();
    });
});
