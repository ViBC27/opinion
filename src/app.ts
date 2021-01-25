import path from 'path';
import('@Lib/passport');
import morgan from 'morgan';
import express from 'express';
import passport from 'passport';
import flash from 'connect-flash';
import session from 'express-session';
import exphbs from 'express-handlebars';
import indexRouter from '@Routes/index';
import opinionsRouter from '@Routes/opinions';
import helpersHandlebars from '@Lib/handlebars';
import database from '@Database/general/database';
import { Request, Response, NextFunction } from 'express';
import authenticationRouter from '@Routes/authentication';
import connectSessionKnexFunction from 'connect-session-knex';
const knexSessionStore = connectSessionKnexFunction(session);

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(flash());

// Settings
app.set('views', path.join(__dirname, 'views'));
app.engine(
    '.hbs',
    exphbs({
        extname: '.hbs',
        defaultLayout: 'main',
        helpers: helpersHandlebars,
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials')
    })
);

app.set('view engine', '.hbs');

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: 'miopinionsnodesessionrs',
        store: new knexSessionStore({ knex: database })
    })
);

app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((request: Request, response: Response, next: NextFunction) => {
    app.locals.success = request.flash('success');
    app.locals.message = request.flash('message');
    app.locals.user = request.user;
    next();
});

// Routes
app.use(indexRouter);
app.use(authenticationRouter);
app.use('/opinions', opinionsRouter);
app.use(express.static(path.join(__dirname, 'public')));

export default app;
