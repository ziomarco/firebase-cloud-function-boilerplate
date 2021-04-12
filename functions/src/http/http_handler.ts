import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

import { unless } from '../helpers/utils';
import { validateAuthToken } from '../helpers/auth_middleware';
import { helloController } from './controllers/hello.controller';

admin.initializeApp();
const app = express();

const noValidationRoutes = ['/hello']; // Routes that does not require authentication

// Middlewares
app.use(cors({ origin: true }));
app.use(unless(noValidationRoutes, validateAuthToken));

app.use('/hello', helloController);

export default app;