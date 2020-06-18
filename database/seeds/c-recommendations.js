
exports.seed =   function recommendations(knex) {
  // Deletes ALL existing entries
  return knex('subs').del()
    .then(function () {
      // Inserts seed entries
      return knex('subs').insert([
        {id: 1, subreddits: ['r/golf', 'r/golfclubs', 'r/pga']},
        {id: 2, subreddits: ['r/codebootcamp', 'r/webdev,', 'r/tech']},
        {id: 3, subreddits: ['r/reddit', 'r/somerandomsub']}
      ]);
    });
};
