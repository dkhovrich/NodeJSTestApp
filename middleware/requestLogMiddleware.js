const moment = require('moment');

module.exports = function() {
	return function(req, res, next) {
		console.log(`Time: ${moment().format()}, Request Type: ${req.method}, Url: ${req.url}`);
		console.log('Cookies: ', req.cookies);
		console.log('Passport', req.session.passport);
		next();
	};
};