import { UserFront } from './../../models/user';
import client from './../../databse';

let id: number;
const firstname = 'ahmed';
const lastname = 'raed';
const email = 'ahmed@jobs.com';
const hash = 'hash';

describe('User model tests', () => {
    const store = new UserFront();

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

        it('should have authenticate method', () => {
            expect(store.authenticate).toBeDefined();
        });
    });

    describe('methods should work', () => {
        it('create method should add a user', async (): Promise<void> => {
            const result = await store.create({
                firstname,
                lastname,
                email,
                password: hash,
            });

            id = result.id as number;

            expect(result.firstname).toEqual(firstname);
            expect(result.lastname).toEqual(lastname);
            expect(result.email).toEqual(email);
            expect(result.password).not.toEqual(hash);
        });

        it('index method should return a list of users', async (): Promise<void> => {
            const result = await store.index();

            expect(result.length).toBeGreaterThan(0);
            expect(result[0].firstname).toEqual(firstname);
            expect(result[0].lastname).toEqual(lastname);
            expect(result[0].email).toEqual(email);
            expect(result[0].password).not.toEqual(hash);
        });

        it('show method should return a user', async (): Promise<void> => {
            const result = await store.show(id);

            if (result != null) {
                expect(result.firstname).toEqual(firstname);
                expect(result.lastname).toEqual(lastname);
                expect(result.email).toEqual(email);
                expect(result.password).not.toEqual(hash);
            }
        });

        it('update method should return updated user', async (): Promise<void> => {
            const firstname = 'mohammed';
            const lastname = 'ali';
            const email = 'ali.com';
            const result = await store.update({
                id,
                firstname,
                lastname,
                email,
                password: hash,
            });
            expect(result.firstname).toEqual(firstname);
            expect(result.lastname).toEqual(lastname);
            expect(result.email).toEqual(email);
        });

        it('delete method should return the user and delete from the database', async (): Promise<void> => {
            const deltedUser = await store.delete(id);
            expect(deltedUser.id).toEqual(id);
            const result = await store.index();
            expect(result).toEqual([]);
        });
    });

    afterAll(async (): Promise<void> => {
        const conn = await client.connect();
        const sql = 'alter sequence users_id_seq restart;';
        await conn.query(sql);
        conn.release();
    });
});
