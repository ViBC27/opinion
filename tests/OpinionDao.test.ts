import app from '@Source/app';
import request from 'supertest';
import('@Database/general/database');
import OpinionDao from '@Dao/Opinion';

const opinionDao = new OpinionDao();
const opinionBase = {
    idUser: 1,
    title: 'O Pensamento Moderno',
    description: 'Pode ser caracterizado ...'
};

const opinionForGet = {
    id: 15,
    idUser: 1,
    title: ' O Moderno Pensamento',
    description: 'Pode ser caracterizado …'
};

const opinionForRemove = {
    id: 16,
    idUser: 1,
    title: ' O Moderno Pensamento',
    description: 'Pode ser caracterizado …'
};

const opinionForUpdate = {
    id: 17,
    idUser: 1,
    title: ' O Moderno Pensamento',
    description: 'Pode ser caracterizado …'
};

describe('Opinion Test', () => {
    it('whenAddNewOpinionToDatabase', async done => {
        const opinionToAdd = { ...opinionBase };
        const opinionAdded = await opinionDao.addOpinion(opinionToAdd);
        expect(opinionAdded.description).toBe(opinionToAdd.description);
        expect(opinionAdded.idUser).toBe(opinionToAdd.idUser);
        expect(opinionAdded.title).toBe(opinionToAdd.title);
        done();
    });

    it('whenGetOpinionsByUserIdInDatabase', async done => {
        const opinionToAdd = { ...opinionBase };
        const opinionAdded = await opinionDao.addOpinion(opinionToAdd);
        const opinionsGeted = await opinionDao.getOpinionsByUserId(opinionBase.idUser);
        expect(opinionAdded.description).toBe(opinionToAdd.description);
        expect(opinionAdded.idUser).toBe(opinionToAdd.idUser);
        expect(opinionAdded.title).toBe(opinionToAdd.title);
        expect(opinionsGeted).not.toHaveLength(0);
        done();
    });

    it('whenGetOpinionByIdInDataBase', async done => {
        const opinionToAdd = { ...opinionForGet };
        const opinionAdded = await opinionDao.addOpinion(opinionToAdd);
        const opinionGeted = await opinionDao.getOpinionById(opinionAdded.id);
        expect(opinionAdded.description).toBe(opinionGeted.description);
        expect(opinionAdded.description).toBe(opinionToAdd.description);
        expect(opinionAdded.idUser).toBe(opinionGeted.idUser);
        expect(opinionAdded.idUser).toBe(opinionToAdd.idUser);
        expect(opinionAdded.title).toBe(opinionGeted.title);
        expect(opinionAdded.title).toBe(opinionToAdd.title);
        expect(opinionAdded.id).toBe(opinionToAdd.id);
        expect(opinionAdded.id).toBe(opinionGeted.id);
        done();
    });

    it('whenRemoveOpinionByIdInDatabase', async done => {
        const removedLines = 1;
        const opinionToAdd = { ...opinionForRemove };
        const opinionAdded = await opinionDao.addOpinion(opinionToAdd);
        const opinionRemoved = await opinionDao.removeOpinionById(opinionAdded.id);
        expect(opinionAdded.description).toBe(opinionToAdd.description);
        expect(opinionAdded.idUser).toBe(opinionToAdd.idUser);
        expect(opinionAdded.title).toBe(opinionToAdd.title);
        expect(opinionAdded.id).toBe(opinionToAdd.id);
        expect(opinionRemoved).toBe(removedLines);
        done();
    });

    it('whenUpdateOpinionByIdInDatabase', async done => {
        const updatedLines = 1;
        const opinionToAdd = { ...opinionForUpdate };
        const opinionToUpdate = { ...opinionForUpdate };
        opinionToUpdate.description = 'As facetas do pensamento';
        const opinionAdded = await opinionDao.addOpinion(opinionToAdd);
        const opinionUpdated = await opinionDao.updateOpinionById(opinionAdded.id, opinionToUpdate);
        const opinionGeted = await opinionDao.getOpinionById(opinionAdded.id);
        expect(opinionGeted.description).toBe(opinionToUpdate.description);
        expect(opinionAdded.description).toBe(opinionToAdd.description);
        expect(opinionAdded.idUser).toBe(opinionToAdd.idUser);
        expect(opinionAdded.title).toBe(opinionToAdd.title);
        expect(opinionAdded.id).toBe(opinionToAdd.id);
        expect(opinionUpdated).toBe(updatedLines);
        done();
    });
});
