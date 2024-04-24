// 操作数据库不同表的sql语句
let test = {
  insert: "INSERT INTO test(id, name, age) VALUES(?,?,?)",
  update: "UPDATE test SET name=?, age=? WHERE id=?",
  delete: "DELETE FROM test WHERE id=?",
  queryById: "SELECT * FROM test WHERE id=?",
  queryAll: "SELECT * FROM test",
};
let user = {
  insert: "INSERT INTO user (name,pwd,tel,email) VALUES(?,?,?,?)",
  update: "UPDATE user SET pwd=?,tel=?,email=? WHERE uid=?",
  delete: "DELETE FROM user WHERE id=?",
  validatePwd: "SELECT pwd,uid FROM user WHERE name=?",
  query: "SELECT uid,name,pwd FROM user where name = ? limit 1",
  queryAll: "SELECT uid,name,tel,email FROM user limit ?",
};
let media = {
  // queryN:"select fname from media where position(? in fpath)>0 limit ?",
  query:"select fpath,fname from media where position(? in fpath)>0 limit ?",
  queryP:"select fpath,fname,title,introduce from media where position(? in fpath)>0  order by fpath asc, fname asc limit ?",
}
module.exports = {
  user,
  test,
  media
};