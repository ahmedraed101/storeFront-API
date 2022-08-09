import supertest from 'supertest';
import app from '../../server';
// import client from '../../databse';

const request = supertest(app);

const route = '/api/orders/';

describe('testing orders endpoint', () => {
    it('index route should return 200 status code', async (): Promise<void> => {
        const result = await request.get(route);
        expect(result.status).toBe(200);
        expect(result.body).toEqual([]);
    });

    describe('user_id routes', () => {
        it('post /:user_id route should return 401 status code', async (): Promise<void> => {
            const result = await request.post(`${route}/1`);
            expect(result.status).toBe(401);
        });

        it('get /:user_id/all route should return 401 status code', async (): Promise<void> => {
            const result = await request.get(`${route}/1/all`);
            expect(result.status).toBe(401);
        });

        it('get /:user_id/active route should return 401 status code', async (): Promise<void> => {
            const result = await request.get(`${route}/1/active`);
            expect(result.status).toBe(401);
        });

        it('get /:user_id/complete route should return 401 status code', async (): Promise<void> => {
            const result = await request.get(`${route}/1/complete`);
            expect(result.status).toBe(401);
        });
    });

    describe('order_id routes', () => {
        it('get /:order_id route should return 401 status code', async (): Promise<void> => {
            const result = await request.get(`${route}/1`);
            expect(result.status).toBe(401);
        });

        it('put /:order_id route should return 401 status code', async (): Promise<void> => {
            const result = await request.put(`${route}/1`);
            expect(result.status).toBe(401);
        });

        it('delete /:order_id route should return 401 status code', async (): Promise<void> => {
            const result = await request.delete(`${route}/1`);
            expect(result.status).toBe(401);
        });
    });

    describe('order_id/products route', () => {
        it('get /:order_id/products route should return 401 status code', async (): Promise<void> => {
            const result = await request.get(`${route}/1/products`);
            expect(result.status).toBe(401);
        });

        it('delete /:order_id/products route should return 401 status code', async (): Promise<void> => {
            const result = await request.delete(`${route}/1/products`);
            expect(result.status).toBe(401);
        });

        it('put /:order_id/products route should return 401 status code', async (): Promise<void> => {
            const result = await request.put(`${route}/1/products`);
            expect(result.status).toBe(401);
        });

        it('post /:order_id/products route should return 401 status code', async (): Promise<void> => {
            const result = await request.post(`${route}/1/products`);
            expect(result.status).toBe(401);
        });
    });
});
