import * as express from 'express';
import requestLogMiddleware from './middleware/requestLogMiddleware';
import errorMiddleware from './middleware/errorMiddleware';
import { userRouter } from './routers/users';

const port: number = 3000;
const app = express();

app.use(express.json());
app.use(requestLogMiddleware());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/users', userRouter);

app.use(errorMiddleware());
app.listen(port, () => console.log(`Server is listening on port ${port}`));