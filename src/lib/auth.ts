import { Request, Response, NextFunction } from 'express';

export function isLoggedIn(request: Request, response: Response, next: NextFunction) {
    if (request.isAuthenticated()) return next();
    else return response.redirect('/signin');
}

export function isNotLoggedIn(request: Request, response: Response, next: NextFunction) {
    if (!request.isAuthenticated()) return next();
    else return response.redirect('/profile');
}
