module.exports = function() {
	return function(req, res, next) {
		if (req.isAuthenticated()) {
			next();
		} else {
			res.sendStatus(401);
		}
	};
};