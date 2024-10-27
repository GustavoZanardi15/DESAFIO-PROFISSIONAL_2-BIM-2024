import { Request, Response, NextFunction } from 'express';

export const updateValueMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { value } = req.body;

  if (typeof value === 'number') {
    req.body.value = value * 1.25;
  }

 
  next();
};
