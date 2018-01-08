const express = require('express');
const _ = require('lodash');
const uuid = require('uuid/v1');

const router = express.Router();

const users = [{
	id: uuid(),
	email: 'PeterParker@mail.com'
}];

router.get('/', (req, res) => {
	res.json(users);
});

router.get('/:id', (req, res) => {
	const user = _.find(users, u => u.id === req.params.id);
	if (user) {
		res.json(user);
	} else {
		res.sendStatus(404);
	}
});

router.post('/', (req, res) => {
	const user = req.body;
	if (!user.id) {
		user.id = uuid();
	}

	users.push(user);
	res.sendStatus(201);
});

router.put('/:id', (req, res) => {
	const index = _.findIndex(users, user => user.id === req.params.id);
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

module.exports = router;