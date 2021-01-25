import passport from 'passport';
import { isLoggedIn, isNotLoggedIn } from '@Lib/auth';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/signup', isNotLoggedIn, (request: Request, response: Response) => {
    response.render('auth/signup');
});

router.get('/signin', isNotLoggedIn, (request: Request, response: Response) => {
    response.render('auth/signin');
});

router.get('/profile', isLoggedIn, (request: Request, response: Response) => {
    response.render('profile');
});

router.get('/logout', isLoggedIn, (request: Request, response: Response) => {
    request.logOut();
    response.redirect('/signin');
});

router.post(
    '/signup',
    isNotLoggedIn,
    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    })
);

router.post('/signin', isNotLoggedIn, (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(request, response, next);
});

export default router;
