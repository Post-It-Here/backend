
exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
        users.increments('id');
        users.string('username', 128).notNullable();
        users.string('password', 128).notNullable();
    })
    .createTable('posts', posts => {
        posts.increments('id');
        posts.string('title', 255).notNullable();
        posts.string('description', 500).notNullable();
    })
    .createTable('reccomendations', rec => {
        rec.increments('id');
        rec.specificType('subreddits', 'text ARRAY').notNullable();
        rec.foreign('id').references('posts.id');
    })
};

exports.down = function(knex) {
  
};
