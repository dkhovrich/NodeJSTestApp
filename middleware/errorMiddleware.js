module.exports = function() {
	return function(err, req, res) {
		console.error(err);
		res.status(500).send('Error!');
	};
};