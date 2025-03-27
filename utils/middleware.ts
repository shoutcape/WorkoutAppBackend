import { NextFunction, Request, Response } from 'express';
import logger from './logger';
import { expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import config from './config';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.message);

  // Handling specific error types
  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      error: 'Username must be unique',
    });
  } 

  else {
    // Default error handler
    res.status(500).json({
      error: err.message || 'An unexpected error occurred',
    });
  }
};

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.auth0.domain}/.well-known/jwks.json`
  }),
  audience: config.auth0.audience,
  issuer: `https://${config.auth0.domain}/`,
  algorithms: ['RS256']
});

const middleware = {
  errorHandler,
  checkJwt
};

export default middleware;
