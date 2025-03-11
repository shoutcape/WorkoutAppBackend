import { Request, Response } from 'express';
import logger from './logger';

const errorHandler = (err: Error, _req: Request, res: Response) => {
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

const middleware = {
  errorHandler,
};

export default middleware;
