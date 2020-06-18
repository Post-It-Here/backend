exports.seed = function users(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'testUser1', password: 'password'},
        {id: 2, username: 'testUser2f', password: 'password'},
        {id: 3, username: 'testUser3', password: 'password'}
      ]);
    });
};
