import helpers from './helpers';
import passport from 'passport';
import UserDao from '@Dao/User';
import { Strategy } from 'passport-local';

const userDao = new UserDao();

const strategySignupConfig = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
};

const strategySigninConfig = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
};

async function strategySigninCallback(request, username, password, done) {
    const userGeted = await userDao.getUserByUsername(username);
    if (!userGeted) return done(null, false, request.flash('message', 'The Username does not exists'));
    const validPassword = await helpers.matchPassword(password, userGeted.password);
    if (validPassword) done(null, userGeted, request.flash('success', 'Welcome, ' + userGeted.username));
    else done(null, false, request.flash('message', 'Incorrect Password'));
}

async function strategySignupCallback(request, username, password, done) {
    let userForAdd = { username, password, fullname: request.body.fullname };
    let userForReturn = { username, fullname: request.body.fullname };
    const userAdded = await userDao.addUser(userForAdd);
    userForReturn.id = userAdded.id;
    return done(null, userForReturn);
}

passport.use('local.signin', new Strategy(strategySigninConfig, strategySigninCallback));
passport.use('local.signup', new Strategy(strategySignupConfig, strategySignupCallback));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userDao.getUserById(id);
    done(null, user);
});
