const { poolPromise } = require("./index");

exports.addNewUser = async function (userInfo) {
  const { id, hashedPassword, username } = userInfo;
  const pool = await poolPromise;
  await pool.query`INSERT INTO Student(student_id, password, name) VALUES
                      (${id}, ${hashedPassword}, ${username});`;
};

exports.getUserById = async function (id) {
  const pool = await poolPromise;
  const { recordset } =
    await pool.query`SELECT * FROM Student WHERE student_id = ${id}`;
  return recordset;
};

exports.checkIdDuplication = async function (id) {
  const pool = await poolPromise;
  const { recordset } =
    await pool.query`SELECT student_id FROM Student WHERE student_id = ${id}`;

  if (recordset.length > 0) return true;
  return false;
};