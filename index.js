const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const uuid = require('uuid/v1');

const requestLogMiddleware = require('./middleware/requestLogMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const passportAuthMiddleware = require('./authenticate/middleware');
const userRouter = require('./routers/users');

require('./authenticate/localStrategy');

const port = 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session({
	genid() {
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