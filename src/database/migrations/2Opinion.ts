import * as Knex from 'knex';

const tableName = 'opinions';
export function up(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.createTable(tableName, t => {
        t.increments('id').primary().notNullable();
        t.integer('idUser').unsigned().notNullable();
        t.string('title', 100).notNullable();
        t.text('description').notNullable();
        t.timestamp('createdAt').notNullable();
        t.timestamp('updatedAt').notNullable();
        t.foreign('idUser').references('id').inTable('users');
    });
}

export function down(knex: Knex): Knex.SchemaBuilder {
    return knex.schema.dropTable(tableName);
}
