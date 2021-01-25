import OpinionDao from '@Dao/Opinion';
import { isLoggedIn } from '@Lib/auth';
import { Router, Request, Response } from 'express';

const router = Router();
const opinionDao = new OpinionDao();

router.get('/', isLoggedIn, async (request: Request, response: Response) => {
    const idUser = request.user.id;
    const opinionsGeted = await opinionDao.getOpinionsByUserId(idUser);
    response.render('opinions/list', { opinionsGeted });
});

router.get('/add', isLoggedIn, (request: Request, response: Response) => {
    response.render('opinions/add');
});

router.get('/edit/:id', isLoggedIn, async (request: Request, response: Response) => {
    const id = request.params.id;
    const opinionForUpdate = await opinionDao.getOpinionById(id);
    response.render('opinions/edit', opinionForUpdate);
});

router.get('/delete/:id', isLoggedIn, async (request: Request, response: Response) => {
    const id = request.params.id;
    await opinionDao.removeOpinionById(id);
    request.flash('success', 'Opinion deleted successfully');
    response.redirect('/opinions');
});

router.post('/add', isLoggedIn, async (request: Request, response: Response) => {
    const { title, description } = request.body;
    const opinionForAdd = { title, description, idUser: request.user.id };
    const opinionAdded = await opinionDao.addOpinion(opinionForAdd);
    request.flash('success', 'Opinion saved successfully');
    response.redirect('/opinions');
});

router.post('/edit/:id', isLoggedIn, async (request: Request, response: Response) => {
    const id = request.params.id;
    const { title, description } = request.body;
    const opinionForUpdate = { title, description };
    await opinionDao.updateOpinionById(id, opinionForUpdate);
    request.flash('success', 'Opinion updated successfully');
    response.redirect('/opinions');
});

export default router;
