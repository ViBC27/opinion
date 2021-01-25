import * as Knex from 'knex';
import Opinion from '../models/Opinion';

export function seed(knex: Knex): Promise<Opinion[]> {
    return Opinion.query(knex).insert([
        {
            idUser: 1,
            title: 'Pensamento Moderno da Vida',
            description: 'O pensamento moderno é ...',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
}
