import * as express from 'express';
import { reportError } from '../../helpers/utils';
const router = express.Router();

import * as helloService from '../services/hello.service';

// Endpoints
router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        return await helloService.getHello(req, res);
    } catch (error) {
        console.error(new Error(error.message));
        await reportError(error, req, {});
        return res.status(500).send({ message: 'Internal Server Error' });
    }
});

export const helloController = router;