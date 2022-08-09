import client from './../../databse';
import { OrderFront } from './../../models/order';
import { UserFront } from './../../models/user';

let id = 1;
const status = 'active';
const newStatus = 'complete';
let user_id: number;

const firstname = 'ahmed';
const lastname = 'raed';
const email = 'ahmed@work.com';
const password = 'Password';

describe('order model tests', () => {
    const store = new OrderFront();
    const userStore = new UserFront();

    describe('have methods', () => {
        it('should have index method', () => {
            expect(store.index).toBeDefined();
        });

        it('should have show method', () => {
            expect(store.show).toBeDefined();
        });

        it('should have create method', () => {
            expect(store.create).toBeDefined();
        });

        it('should have update method', () => {
            expect(store.update).toBeDefined();
        });

        it('should have delete method', () => {
            expect(store.delete).toBeDefined();
        });
    });

    describe('methods should work', () => {
        it('create method should add a user', async (): Promise<void> => {
            const result = await store.create({
                status,
                user_id,
            });

            id = result.id as number;

            expect(result.status).toEqual(status);
            expect(result.id as number).toEqual(id);
        });

        it('index method should return a list of users', async (): Promise<void> => {
            const result = await store.index();

            expect(result.length).toBeGreaterThan(0);
            expect(result[0].status).toEqual(status);
        });

        it('show method should return a user', async (): Promise<void> => {
            const result = await store.show(id);

            if (result != null) {
                expect(result.status).toEqual(status);
                expect(result.id as number).toEqual(id);
            }
        });

        it('update method should return an updated user', async (): Promise<void> => {
            const result = await store.update(id, newStatus);

            expect(result.status).toEqual(newStatus);
            expect(result.id as number).toEqual(id);
        });

        it('delete method should return the user and delete from the database', async (): Promise<void> => {
            const deltedOrder = await store.delete(id);
            expect(deltedOrder.id).toEqual(id);
            const result = await store.index();
            expect(result).toEqual([]);
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
    });

    afterAll(async (): Promise<void> => {
        await userStore.delete(user_id);
        const conn = await client.connect();
        const sql = 'alter sequence orders_id_seq restart;';
        const sql2 = 'alter sequence users_id_seq restart;';
        await conn.query(sql);
        await conn.query(sql2);
        conn.release();
    });
});
