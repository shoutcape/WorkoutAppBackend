import { NextFunction, Request, Response } from 'express';
import logger from './logger';
import jwt from 'jsonwebtoken';
import config from './config';

export interface AuthRequest extends Request {
  auth?: {
    id: string;
    username: string;
  };
}

class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

const checkJwt = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // This error will automatically be passed to the error handler
    throw new HttpError('Token missing or invalid', 401);
  }

  const token = authHeader.substring(7);

  const decodedToken = jwt.verify(
    token,
    config.JWT_SECRET || 'your_jwt_secret',
  ) as any;
  req.auth = { id: decodedToken.id, username: decodedToken.username };
  next();
};

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error(err.message);


  // Check for custom HttpError
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Handling specific error types
  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      error: 'Username must be unique',
    });
  } else {
    // Default error handler
    res.status(500).json({
      error: err.message || 'An unexpected error occurred',
    });
  }
};

const middleware = {
  errorHandler,
  checkJwt,
};

export default middleware;
