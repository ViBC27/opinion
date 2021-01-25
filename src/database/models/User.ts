import BaseModelDate from './BaseModelDate';
import UserMappings from '../mappings/UserMappings';

export default class User extends BaseModelDate {
    id: number;
    username: string;
    password: string;
    fullname: string;
    static tableName = 'users';
    static relationMappings = UserMappings;
}
