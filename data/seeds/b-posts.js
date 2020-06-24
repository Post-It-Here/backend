
exports.seed = function posts(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, user_id: 1, title: 'Golf Clubs', description: 'fake description'},
        {id: 2, user_id: 2, title: 'Lambda School Web Dev', description: 'fake description'},
        {id: 3, user_id: 2, title: 'Best Reddit Thread?', description: 'fake description'}
      ]);
    });
};
