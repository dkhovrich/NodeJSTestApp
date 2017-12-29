import * as express from 'express';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as uuid from 'uuid/v1';
import requestLogMiddleware from './middleware/requestLogMiddleware';
import errorMiddleware from './middleware/errorMiddleware';
import passportAuthMiddleware from './authenticate/middleware';
import { userRouter } from './routers/users';
import './authenticate/init';

const port: number = 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session({
    genid(req) {
        return uuid();
    },
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(requestLogMiddleware());

app.post('/login', passport.authenticate('local'), (req, res) => res.sendStatus(200));

app.use(passportAuthMiddleware());
app.use('/users', userRouter);

app.use(errorMiddleware());
app.listen(port, () => console.log(`Server is listening on port ${port}`));