import client from './../databse';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category?: string | null;
};

export class ProductFront {
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products;';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`can't get all products from database ${err}`);
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const sql = `INSERT INTO products (name, price, category) values ($1, $2, $3) RETURNING *;`;
            const conn = await client.connect();
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`could't create Product ${err}.`);
        }
    }

    async show(id: number): Promise<Product | null> {
        try {
            const sql = `SELECT * FROM products WHERE id=($1);`;
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`couldn't find the user ${err}`);
        }
    }

    async update(p: Product): Promise<Product> {
        try {
            const sql =
                'update products set name=($1), price=($2), category=($3) where id=($4) returning *;';
            const conn = await client.connect();
            const result = await conn.query(sql, [
                p.name,
                p.price,
                p.category,
                p.id,
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can't update Product ${err}`);
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *;';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`can't delete user ${err}`);
        }
    }

    async mostPopular(): Promise<Product[]> {
        try {
            const sql =
                'SELECT * FROM order_products ORDER BY quantity DESC LIMIT 5;';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `can't get op 5 most popular products from database ${err}`
            );
        }
    }

    async byCategory(cat: string): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products WHERE category=($1);';
            const conn = await client.connect();
            const result = await conn.query(sql, [cat]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `can't get Products by category from database ${err}`
            );
        }
    }
}
