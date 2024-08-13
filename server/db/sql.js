// 操作数据库不同表的sql语句
let test = {
  insert: "INSERT INTO test(uid, name, age,comment) VALUES(?,?,18,?)",
  update: "UPDATE test SET name=?, age=? WHERE uid=?",
  delete: "DELETE FROM test WHERE uid=?",
  queryById: "SELECT * FROM test WHERE uid=?",
  queryAll: "SELECT * FROM test",
};
let user = {
  insert: "INSERT INTO user (name,pwd,tel,email) VALUES(?,?,?,?)",
  update: "UPDATE user SET pwd=?,tel=?,email=? WHERE uid=?",
  delete: "DELETE FROM user WHERE uid=?",
  validatePwd: "SELECT pwd,uid FROM user WHERE name=?",
  query: "SELECT uid,name,pwd FROM user where name = ? limit 1",
  queryAll: "SELECT uid,name,tel,email FROM user limit ?",
};
let media = {
  // queryN:"select fname from media where position(? in fpath)>0 limit ?",
  query:"select fpath,fname from media where position(? in fpath)>0 limit ?",
  queryP:"select fpath,fname,title,introduce from media where position(? in fpath)>0  order by fpath asc, fname asc limit ?",
}
// 评论
const comments = {
  insert:"INSERT INTO comments (uid, comment, name, time) VALUES(?,?,?,?)",
  queryAll:"SELECT * FROM comments order by time desc",
}
module.exports = {
  user,
  test,
  media,
  comments,
};
