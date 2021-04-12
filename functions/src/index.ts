import * as functions from 'firebase-functions';

export const api = functions
  .runWith({ timeoutSeconds: 60, memory: '512MB' })
  .https
  .onRequest(async (request, response) => {
    await (await import('./http/http_handler')).default(request, response);
  });

