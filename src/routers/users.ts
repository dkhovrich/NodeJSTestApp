import { Router } from 'express-serve-static-core';
import * as express from 'express';
import * as _ from 'lodash';
import * as uuid from 'uuid/v1';
import User from '../models/user';

const router: Router = express.Router();

const users: User[] = [{
    id: uuid(),
    firstName: 'Peter',
    lastName: 'Parker'
}];

router.get('/', (req, res) => {
    res.json(users);
});

router.get('/:id', (req, res) => {
    const user: User = _.find(users, u => u.id === req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    const user: User = req.body;
    if (!user.id) {
        user.id = uuid();
    }

    users.push(user);
    res.sendStatus(201);
});

router.put('/:id', (req, res) => {
    const index: number = _.findIndex(users, user => user.id === req.params.id);
    if (index >= 0) {
        users[index] = req.body;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/:id', (req, res) => {
    const index = _.findIndex(users, user => user.id === req.params.id);
    if (index >= 0) {
        users.splice(index, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

export { router as userRouter };