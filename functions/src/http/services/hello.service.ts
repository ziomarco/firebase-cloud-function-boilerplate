import * as express from 'express';
import { getAll } from '../database';

export const getHello = async (req: express.Request, res: express.Response) => {
    // await getAll();
    return res.status(200).send('Hello!');
}