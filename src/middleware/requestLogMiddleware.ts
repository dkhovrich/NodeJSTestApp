import { Request, Response, NextFunction } from 'express-serve-static-core';
import * as moment from 'moment';

export default function() {
    return function(req: Request, res: Response, next: NextFunction) {
        console.log(`Time: ${moment().format()}, Request Type: ${req.method}, Url: ${req.url}`);
        next();
    };
}