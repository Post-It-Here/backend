exports.seed =   function subs(knex) {
  // Deletes ALL existing entries
  return knex('subs').del()
    .then(function () {
      // Inserts seed entries
      return knex('subs').insert([
        {id: 1, post_id: 2, subreddits: JSON.stringify(['r/golf', 'r/golfclubs', 'r/pga'])},
        {id: 2, post_id: 2, subreddits: JSON.stringify(['r/codebootcamp', 'r/webdev,', 'r/tech'])},
        {id: 3, post_id: 2, subreddits: JSON.stringify(['r/reddit', 'r/somerandomsub'])}
      ]);
    });
};
