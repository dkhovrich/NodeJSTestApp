import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user';

const user: User = {
    id: '438d6e81-e767-43da-97aa-2e1de3bc68e1',
    email: 'test@test.com',
    password: 'qwerty'
};

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(username: string, password: string, done) {
    if (user.email === username && user.password === password) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

passport.serializeUser((user: User, done) => {
    done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
    if (user.id === id) {
        done(null, user);
    } else {
        done(new Error('User not found!'));
    }
});