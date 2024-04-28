const knex = require("../db/connection");

function list() {
  // your solution here
  return knex("comments").select("*")
  
}

function listCommenterCount() {
  // your solution here
  return knex("comments as c")
  .join("users as u", "c.commenter_id", "u.user_id")
  .count("*")
  .select("u.user_email as commenter_email")
  .groupBy("u.user_email")
  .orderBy("commenter_email")
}

function read(commentId) {
  // your solution here
  return knex("comments as c")
  .join("posts as p", "p.post_id", "c.post_id")
  .join("users as u", "u.user_id", "c.commenter_id")
  .select(
    "c.comment_id",
    "c.comment",
    "u.user_email as commenter_email",
    "p.post_body as commented_post"
  )
  .where({ "c.comment_id": commentId })
  .first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
