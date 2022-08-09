import supertest from 'supertest';
import app from '../../server';
import client from '../../databse';

const request = supertest(app);

const name = 'test product';
const price = 310;
const category = 'test category';

const route = '/api/products/';

describe('testing products endpoint', () => {
    it('get all products should return status code 200', async (): Promise<void> => {
        const response = await request.get(route);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it('show product should return status code 200', async (): Promise<void> => {
        const response = await request.get(`${route}/1`);
        expect(response.status).toBe(200);
    });

    it('update product should return status code 401', async (): Promise<void> => {
        const response = await request
            .put(`${route}/1`)
            .send({ name, price, category });
        expect(response.status).toBe(401);
    });

    it('delete product should return status code 401', async (): Promise<void> => {
        const response = await request.delete(`${route}/1`);
        expect(response.status).toBe(401);
    });

    it('create product should return status code 400', async (): Promise<void> => {
        const response = await request
            .post(route)
            .send({ name, price, category });
        expect(response.status).toBe(401);
    });

    afterAll(async (): Promise<void> => {
        const conn = await client.connect();
        await conn.query('delete from products');
        await conn.query('alter sequence products_id_seq restart;');
        conn.release();
    });
});
