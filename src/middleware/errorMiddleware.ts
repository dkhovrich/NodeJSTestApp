import { Request, Response, NextFunction, ErrorRequestHandler } from 'express-serve-static-core';

export default function() {
    return function(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
        console.log(err);
        res.status(500).send('Error!');
    };
}