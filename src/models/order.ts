import client from './../databse';

export type Status = 'active' | 'complete';

export type Order = {
    id?: number;
    status: Status;
    user_id: number;
};

export class OrderFront {
    async index(): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders;';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`can't get all orders from database ${err}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const sql = `INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *`;
            const conn = await client.connect();
            const result = await conn.query(sql, [o.status, o.user_id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`cannot create order ${err}`);
        }
    }

    async show(id: number): Promise<Order | null> {
        try {
            const sql = `SELECT * FROM orders WHERE id=($1);`;
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`couldn't find the order ${err}`);
        }
    }

    async update(id: number, status: Status): Promise<Order> {
        try {
            const sql =
                'UPDATE orders SET status=($1) WHERE id=($2) RETURNING *;';
            const conn = await client.connect();
            const result = await conn.query(sql, [status, id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can't update Order ${err}`);
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *;';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can't delete order ${err}`);
        }
    }
}
