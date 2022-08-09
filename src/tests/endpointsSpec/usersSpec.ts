import supertest from 'supertest';
import app from '../../server';
import client from '../../databse';

const request = supertest(app);

const route = '/api/users/';
// let token: string;
const firstname = 'ahmed';
const lastname = 'raed';
const email = 'ahmed@lol.com';
const password = 'password';

describe('testing users endpoint', () => {
    it('get all users should return status code 401', async (): Promise<void> => {
        const response = await request.get(route);
        expect(response.status).toBe(401);
    });

    it('show user should return status code 401', async (): Promise<void> => {
        const response = await request.get(`${route}/1`);
        expect(response.status).toBe(401);
    });

    it('update user should return status code 401', async (): Promise<void> => {
        const response = await request.put(`${route}/1`);
        expect(response.status).toBe(401);
    });

    it('delete user should return status code 401', async (): Promise<void> => {
        const response = await request.delete(`${route}/1`);
        expect(response.status).toBe(401);
    });

    it('create user should return status code 400', async (): Promise<void> => {
        const response = await request.post(route);
        expect(response.status).toBe(400);
    });

    it('create user should return new token', async (): Promise<void> => {
        const response = await request
            .post(route)
            .send({ firstname, lastname, email, password });
        expect(response.status).toBe(200);
    });

    it('/login should return 400 if the credential is right', async (): Promise<void> => {
        const response = await request
            .post(`${route}/login`)
            .send({ email: 'wrong@email.com', password });
        expect(response.status).toBe(400);
    });

    it('/login should return 400 if the credential is right', async (): Promise<void> => {
        const response = await request
            .post(`${route}/login`)
            .send({ email, password: 'wrong password' });
        expect(response.status).toBe(400);
    });

    it('/login should return 200 if the credential is right', async (): Promise<void> => {
        const response = await request
            .post(`${route}/login`)
            .send({ email, password });
        expect(response.status).toBe(200);
    });

    it('delete user should return user deleted', async (): Promise<void> => {
        const response = await request.delete(`${route}/2`);
        expect(response.status).toBe(401);
    });

    afterAll(async (): Promise<void> => {
        const conn = await client.connect();
        await conn.query('delete from users');
        await conn.query('alter sequence users_id_seq restart;');
        conn.release();
    });
});
