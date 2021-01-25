import * as Knex from 'knex';

const tableName = 'users';
export function up(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.createTable(tableName, t => {
        t.increments('id').primary().notNullable();
        t.string('username', 100).notNullable().unique();
        t.string('password', 100).notNullable();
        t.string('fullname', 100).notNullable();
        t.timestamp('createdAt').notNullable();
        t.timestamp('updatedAt').notNullable();
    });
}

export function down(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.dropTable(tableName);
}
