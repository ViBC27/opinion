import * as Knex from 'knex';
import User from '../models/User';

export function seed(knex: Knex): Promise<User[]> {
    return User.query(knex).insert([
        {
            id: 1,
            username: 'ViBC27',
            password: 'Passowrd',
            fullname: 'Vitor Barcelos',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
}
