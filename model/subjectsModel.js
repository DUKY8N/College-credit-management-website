const { poolPromise } = require("./index");


//성적등록
exports.addScore = async function (userScore) {
    const { subject_code, academic_credit, subject_name, grade, date, student_id } = userScore;
    const pool = await poolPromise;
    await pool.query`INSERT INTO Score
                        VALUES (${subject_code}, ${subject_name}, ${academic_credit}, ${grade}, ${date}, ${student_id});`;       
};

//성적수정
exports.changeScore = async function (newGrade, subject_code, id) {
    const pool = await poolPromise;
    await pool.query`UPDATE Score SET grade = ${newGrade} WHERE subject_code = ${subject_code} AND student_id = ${id};`;
}

//과목수정
exports.editSubject = async function (id, subject_code, date, new_subject_name, new_subject_code, new_academic_credit, new_grade) {
    const pool = await poolPromise;
    await pool.query`
      UPDATE Score SET grade = ${new_grade}, subject_code = ${new_subject_code}, subject_name = ${new_subject_name}, academic_credit = ${new_academic_credit}
      WHERE subject_code = ${subject_code} AND student_id = ${id} AND date = ${date};
    `;
};;

//과목정보 불러오기
exports.getSubjectInfo = async function (id, subject_code, date) {
  const pool = await poolPromise;
  const { recordset } = await pool.query`
    SELECT * FROM Score WHERE student_id = ${id} AND subject_code = ${subject_code} AND date = ${date};
  `;
  return recordset[0];
};

//평균학점
exports.avgScore = async function (id) {
    const pool = await poolPromise;
    const { recordset } =
      await pool.query`SELECT ROUND(SUM(academic_credit * grade) / SUM(academic_credit), 2) AS averageScore FROM Score WHERE student_id = ${id};`;
    return recordset[0]?.averageScore;
};

//학기평균학점
exports.semesterAvgScore = async function (id, date) {
  const pool = await poolPromise;
  const { recordset } =
    await pool.query`SELECT ROUND(SUM(academic_credit * grade) / SUM(academic_credit), 2) AS averageScore FROM Score WHERE student_id = ${id} AND date = ${date};`;
  return recordset[0]?.averageScore;
};

//졸업요건비교
exports.Graduated = async function (id) {
  const pool = await poolPromise;
  const { recordset } = await pool.query`SELECT subject_code, subject_name, academic_credit, grade
                                         FROM viewGraduatedScores
                                         WHERE student_id = ${id} OR student_id IS NULL`;
  return recordset;
};

//들은과목수확인
exports.listenSubject = async function (id) {
    const pool = await poolPromise;
    const { recordset } =
      await pool.query`SELECT COUNT(*) as listen_Subject FROM Score WHERE student_id = ${id} GROUP BY student_id;`;
    return recordset[0]?.listen_Subject;
};

//통합정렬
exports.filterAndSortScores = async function (id, date, filter, sort, order) {
  const pool = await poolPromise;
  let query = `SELECT subject_code, subject_name, academic_credit, grade FROM viewScore WHERE student_id = ${id}`;

  if (date) {
    query += ` AND date = '${date}'`;
  }

  if (filter === 'major') {
    query += ` AND subject_code LIKE ('%COM%')`;
  } else if (filter === 'notmajor') {
    query += ` AND subject_code NOT LIKE ('%COM%')`;
  }

  switch(sort) {
    case 'grade':
      query += ` ORDER BY grade`;
      break;
    case 'subject_name':
      query += ` ORDER BY subject_name`;
      break;
    case 'subject_code':
      query += ` ORDER BY subject_code`;
      break;
    case 'academic_credit':
      query += ` ORDER BY academic_credit`;
      break;
    default:
      query += ` ORDER BY grade`;
  }

  switch(order) {
    case 'desc':
      query += ` DESC`;
      break;
    case 'asc':
      query += ` ASC`;
      break;
    default:
      query += ` ASC`;
  }

  const { recordset } = await pool.query(query);
  return recordset;
};

//성적 삭제
exports.deleteScore = async function (id, subject_code) {
  const pool = await poolPromise;

  const checkResult = await pool.query`SELECT COUNT(1) AS count FROM Score WHERE student_id = ${id} AND subject_code = ${subject_code}`;
  const count = checkResult.recordset[0]?.count;

  if (count === 0) {
    return false;
  }

  await pool.query`DELETE FROM Score WHERE student_id = ${id} AND subject_code = ${subject_code}`;
  return true;
};

//졸업요건정렬
exports.sortGraduated = async function (id, filter, sort, order) {
  const pool = await poolPromise;
  let query = `SELECT * FROM viewGraduatedScores
               WHERE student_id = ${id} OR student_id IS NULL`;

  if (filter === 'major') {
    query += ` AND subject_code LIKE ('%COM%')`;
  } else if (filter === 'notmajor') {
    query += ` AND subject_code NOT LIKE ('%COM%')`;
  }

  switch(sort) {
    case 'grade':
      query += ` ORDER BY grade`;
      break;
    case 'subject_name':
      query += ` ORDER BY subject_name`;
      break;
    case 'subject_code':
      query += ` ORDER BY subject_code`;
      break;
    case 'academic_credit':
      query += ` ORDER BY academic_credit`;
      break;
    case 'completion_status':
      query += ` ORDER BY completion_status`;
      break;
    default:
      query += ` ORDER BY grade`;
  }

  switch(order) {
    case 'desc':
      query += ` DESC`;
      break;
    case 'asc':
      query += ` ASC`;
      break;
    default:
      query += ` ASC`;
  }

  const { recordset } = await pool.query(query);
  return recordset;
};