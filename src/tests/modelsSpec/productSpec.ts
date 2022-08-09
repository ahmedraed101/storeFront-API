import { ProductFront } from './../../models/product';
import client from './../../databse';

let id: number;
const name = 'mouse';
const price = 100;
const category = 'electronics';

const newName = 'keyboard';
const newPrice = 200;
const newCategory = 'electronics';

describe('Product model tests', () => {
    const store = new ProductFront();

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

        it('should have mostPopular method', () => {
            expect(store.mostPopular).toBeDefined();
        });

        it('should have byCategory method', () => {
            expect(store.byCategory).toBeDefined();
        });
    });

    describe('methods should work', () => {
        it('create method should add a user', async (): Promise<void> => {
            const result = await store.create({
                name,
                price,
                category,
            });

            id = result.id as number;

            expect(result.name).toEqual(name);
            expect(result.price as number).toEqual(price);
            expect(result.category).toEqual(category);
        });

        it('index method should return a list of users', async (): Promise<void> => {
            const result = await store.index();

            expect(result.length).toBeGreaterThan(0);
            expect(result[0].name).toEqual(name);
            expect(result[0].price as number).toEqual(price);
            expect(result[0].category).toEqual(category);
        });

        it('show method should return a user', async (): Promise<void> => {
            const result = await store.show(id);

            if (result != null) {
                expect(result.name).toEqual(name);
                expect(result.price as number).toEqual(price);
                expect(result.category).toEqual(category);
            }
        });

        it('update method should return an updated user', async (): Promise<void> => {
            const result = await store.update({
                id,
                name: newName,
                price: newPrice,
                category: newCategory,
            });

            expect(result.name).toEqual(newName);
            expect(result.price as number).toEqual(newPrice);
            expect(result.category).toEqual(newCategory);
            expect(result.id as number).toEqual(id);
        });

        it('delete method should return the user and delete from the database', async (): Promise<void> => {
            const deleteProduct = await store.delete(id);
            expect(deleteProduct.id).toEqual(id);
            const result = await store.index();
            expect(result).toEqual([]);
        });
    });

    afterAll(async (): Promise<void> => {
        const conn = await client.connect();
        const sql = 'alter sequence products_id_seq restart;';
        await conn.query(sql);
        conn.release();
    });
});
