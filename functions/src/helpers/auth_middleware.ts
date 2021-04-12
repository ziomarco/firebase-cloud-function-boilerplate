import * as express from 'express';
import * as admin from 'firebase-admin';
import { reportError } from './utils';

/**
 * Validate authorization token passed in the authorization field of the request header
 *
 * @param request express request
 * @param response express response
 * @param next go to the next
 */
export const validateAuthToken = async (request: express.Request, response: express.Response, next: () => any) => {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401)
            .send({
                message: 'Unauthorized',
                code: 'authentication-error',
            });
    }

    try {
        const authToken = authorization.split('Bearer ')[1];
        const decodedToken = await admin.auth().verifyIdToken(authToken);
        request['user'] = decodedToken;
        return next();
    } catch (error) {
        await reportError(error, request, {});
        switch (error.code) {
            case 'auth/argument-error':
                return response.status(401)
                    .send({
                        message: 'Unauthorized: Incomplete arguments passed',
                        code: 'authentication-error',
                    });
            case 'auth/id-token-expired':
                return response.status(401)
                    .send({
                        message: 'Unauthorized: Refresh idToken',
                        code: 'authentication-error',
                    });
            default:
                return response.status(401)
                    .send({
                        message: 'Unauthorized',
                        code: 'authentication-error',
                    });
        }
    }
};