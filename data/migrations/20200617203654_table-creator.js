exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
        users.increments('id').notNullable();
        users.string('username', 128)
            .notNullable()
            .unique();
        users.string('password', 128).notNullable();
    })
    .createTable('posts', posts => {
        posts.increments('id')
        posts.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        posts.string('title', 255).notNullable();
        posts.string('description', 500).notNullable();
    })
    .createTable('subs', sub => {
        sub.increments('id')
        sub.integer('post_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('posts')
            .onDelete('CASCADE')
        sub.json('subreddits').notNullable();
    })
};

exports.down = function(knex) {
  return (
      knex.schema
        .dropTableIfExists('subs')
        .dropTableIfExists('posts')
        .dropTableIfExists('users')
  )
};
