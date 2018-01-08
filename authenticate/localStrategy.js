const passport = require('passport');
const { Strategy } = require('passport-local');

const user = {
	id: '438d6e81-e767-43da-97aa-2e1de3bc68e1',
	email: 'test@test.com',
	password: 'qwerty'
};

passport.use(new Strategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(username, password, done) {
	if (user.email === username && user.password === password) {
		return done(null, user);
	} else {
		return done(null, false);
	}
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	if (user.id === id) {
		done(null, user);
	} else {
		done(new Error('User not found!'));
	}
});