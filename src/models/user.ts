import client from './../databse';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const papper = process.env.BCRYPT_PASSWORD;
const saltRounds = parseInt(process.env.SALT_ROUNDS as string);

export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};

export class UserFront {
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users;';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`can't get all users from database ${err}`);
        }
    }

    async create(u: User): Promise<User> {
        try {
            const sql =
                'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *;';
            const hash = bcrypt.hashSync(u.password + papper, saltRounds);
            const conn = await client.connect();
            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                u.email,
                hash,
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(`couldn't create a user ${err}`);
        }
    }

    async authenticate(email: string, password: string): Promise<User | null> {
        const sql = 'SELECT password FROM users WHERE email=($1);';
        const conn = await client.connect();
        const result = await conn.query(sql, [email]);

        conn.release();

        // console.log(password + papper);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt.compareSync(password + papper, user.password)) {
                return user;
            }
        }
        return null;
    }

    async show(id: number): Promise<User | null> {
        try {
            const sql = `SELECT * FROM users WHERE id=($1);`;
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`couldn't find the user ${err}`);
        }
    }

    async update(u: User): Promise<User> {
        try {
            const sql =
                'update users set firstname=($1), lastname=($2), email=($3), password=($4) where id=($5) returning *;';
            const hash = bcrypt.hashSync(u.password + papper, saltRounds);
            const conn = await client.connect();
            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                u.email,
                hash,
                u.id,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`couldn't update user ${err}`);
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *;';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can't delete user ${err}`);
        }
    }
}
