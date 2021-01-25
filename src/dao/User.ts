import helpers from '@Lib/helpers';
import UserModel from '@Models/User';

export default class User {
    public async getUserByUsername(username: string) {
        return await UserModel.query().select().where({ username }).first();
    }

    public async addUser(user: any) {
        user.password = await helpers.encryptPassword(user.password);
        return await UserModel.query().insert(user);
    }

    public async getUserById(id: number) {
        return await UserModel.query().select().where({ id }).first();
    }
}
