import { Request, Response } from 'express';
import { Product, ProductFront } from './../models/product';

const store = new ProductFront();

export const index = async (_req: Request, res: Response): Promise<void> => {
    const products = await store.index();
    res.json(products);
};

export const create = async (req: Request, res: Response): Promise<void> => {
    const product: Product = {
        name: req.body.name as string,
        price: req.body.price as unknown as number,
        category: req.body.category as string | null,
    };
    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (e) {
        res.status(400);
        res.json(`${e}, ${product}`);
    }
};

export const show = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as unknown as number;
    try {
        const product = await store.show(id as number);
        res.json(product);
    } catch (e) {
        res.status(400);
        res.json(`${id} ${e}`);
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    const product: Product = {
        id: req.params.id as unknown as number,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category as string | null,
    };
    try {
        const newProduct = await store.update(product);
        res.json(newProduct);
    } catch (e) {
        res.status(400);
        res.json(`${e}, ${product}`);
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    const id = req.params.id as unknown as number;
    try {
        const product = await store.delete(id as number);
        res.json(product);
    } catch (e) {
        res.status(400);
        res.json(`${id} ${e}`);
    }
};
