exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
        users.increments('id').notNullable();
        users.string('username', 128).notNullable();
        users.string('password', 128).notNullable();
    })
    .createTable('posts', posts => {
        posts.increments('id')
            .notNullable()
            .references('id')
            .inTable('users');
        posts.string('title', 255).notNullable();
        posts.string('description', 500).notNullable();
    })
    .createTable('subs', rec => {
        rec.increments('id')
            .notNullable()
            .references('id')
            .inTable('posts');
        rec.specificType('subreddits', 'string ARRAY');
    })
};

exports.down = function(knex) {
  return (
      knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('posts')
        .dropTableIfExists('subs')
  )
};
