import app from '@Source/app';
import UserDao from '@Dao/User';
import request from 'supertest';
import('@Database/general/database');

const userDao = new UserDao();
const userBase = {
    id: 2,
    fullname: 'Vitor Barcelos',
    username: 'ViBC30',
    password: '12345'
};

describe('User Test', () => {
    it('whenAddNewUserToDatabase', async done => {
        const userToAdd = { ...userBase };
        const userAdded = await userDao.addUser(userToAdd);
        expect(userAdded.fullname).toBe(userToAdd.fullname);
        expect(userAdded.username).toBe(userToAdd.username);
        expect(userAdded.id).toBe(userToAdd.id);
        done();
    });

    it('whenGetUserByUsernameInDatabase', async done => {
        const userGetedByUsername = await userDao.getUserByUsername(userBase.username);
        expect(userGetedByUsername.fullname).toBe(userBase.fullname);
        expect(userGetedByUsername.username).toBe(userBase.username);
        done();
    });

    it('whenGetUserByIdInDatabase', async done => {
        const userGetedByUsername = await userDao.getUserByUsername(userBase.username);
        const userGetedById = await userDao.getUserById(userGetedByUsername.id);
        expect(userGetedByUsername.fullname).toBe(userBase.fullname);
        expect(userGetedByUsername.username).toBe(userBase.username);
        expect(userGetedById.fullname).toBe(userBase.fullname);
        expect(userGetedById.username).toBe(userBase.username);
        done();
    });
});
