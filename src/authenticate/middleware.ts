import { Request, Response, NextFunction } from 'express-serve-static-core';

export default function() {
    return function(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.sendStatus(401);
        }
    };
}