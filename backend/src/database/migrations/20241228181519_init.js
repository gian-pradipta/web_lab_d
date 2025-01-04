/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
      })
      .createTable('questions', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('title').notNullable();
        table.text('body').notNullable();
      })
      .createTable('answers', (table) => {
        table.increments('id').primary();
        table.integer('question_id').unsigned().notNullable();
        table.text('body').notNullable();
        table.foreign('question_id').references('id').inTable('questions').onDelete('CASCADE');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('answers')
        .dropTableIfExists('questions')
        .dropTableIfExists('users');
};
