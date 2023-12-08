const createError = require("http-errors");
const subjectsModel = require("../model/subjectsModel");
const bcrypt = require("bcrypt");

//성적등록 컨트롤러
exports.addScore = async function (req, res, next) {
    try {
      const userScore = req.body;

      await subjectsModel.addScore(userScore);

      res.status(201).json({ success: true, message: 'Score added successfully' });
    } catch (error) {
      next(error);
    }
};

//성적수정 컨트롤러
//! 해당 과목 코드까지 불러오기 구현
exports.changeScore = async function (req, res, next) {
    try {
      const { newGrade, subject_code, student_id } = req.body;
  
      await subjectsModel.changeScore(newGrade, subject_code, student_id);
  
      res.status(200).json({ success: true, message: 'Score updated successfully' });
    } catch (error) {
      next(error);
    }
};

//평균학점 계산 컨트롤러
exports.avgScore = async function (req, res, next) {
  try {
    const averageScore = await subjectsModel.avgScore(req.user);

    if (averageScore) {
      res.status(200).json({ success: true, averageScore });
    } else {
      res.status(404).json({ success: false, message: 'Average score not found' });
    }
  } catch (error) {
    next(error);
  }
};

//졸업요건비교 컨트롤러
exports.Graduated = async function (req, res, next) {
  try {
    const { subject_code } = req.body;

    const result = await subjectsModel.Graduated(user.name, subject_code);

    if (result && result.length > 0) {
      res.status(200).json({ success: true, message: 'Subject codes match', result });
    } else {
      res.status(404).json({ success: false, message: 'Subject codes do not match' });
    }
  } catch (error) {
    next(error);
  }
};

//학기별성적보기 컨트롤러
//! 해당 학기 불러오기 구현
exports.dateScore = async function (req, res, next) {
  try {
    const { date } = req.body;

    const dateScores = await subjectsModel.dateScore(date, req.user);

    if (dateScores && dateScores.length > 0) {
      res.status(200).json({ success: true, dateScores });
    } else {
      res.status(404).json({ success: false, message: 'No scores found for the given date and student ID' });
    }
  } catch (error) {
    next(error);
  }
};

//성적정렬 컨트롤러
exports.sortScores = async function (req, res, next) {
  try {
    const { order } = req.body;
    let sortedScores;

    switch (order) {
      case 'asc':
        sortedScores = await subjectsModel.sortScoreAsc(req.user);
        break;
      case 'desc':
        sortedScores = await subjectsModel.sortScoreDesc(req.user);
        break;
      case 'default':
        sortedScores = await subjectsModel.sortScoreDefault(req.user);
        break;
      default:
        res.status(400).json({ success: false, message: 'Invalid order parameter' });
        return;
    }

    if (sortedScores && sortedScores.length > 0) {
      res.status(200).json({ success: true, sortedScores });
    } else {
      res.status(404).json({ success: false, message: 'Sorted scores not found' });
    }
  } catch (error) {
    next(error);
  }
};

//들은과목 수 확인
exports.listenSubject = async function (req, res, next) {
  try {
    const result = await subjectsModel.listenSubject(req.user);

    if (result && result.length > 0) {
      res.status(200).json({ success: true, message: 'Student scores exist', result });
    } else {
      res.status(404).json({ success: false, message: 'Student scores not found' });
    }
  } catch (error) {
    next(error);
  }
};

//전공,비전공 필터링
exports.filterScores = async function (req, res, next) {
  try {
    const { filter } = req.body;
    let filteredScores;

    switch (filter) {
      case 'major':
        filteredScores = await subjectsModel.majorSubject(req.user);
        break;
      case 'notmajor':
        filteredScores = await subjectsModel.notmajorSubject(req.user);
        break;
      case 'default':
        filteredScores = await subjectsModel.sortScoreDefault(req.user);
        break;
      default:
        res.status(400).json({ success: false, message: '잘못된 필터입니다' });
        return;
    }

    if (filteredScores && filteredScores.length > 0) {
      res.status(200).json({ success: true, filteredScores });
    } else {
      res.status(404).json({ success: false, message: '필터된 성적이 없습니다' });
    }
  } catch (error) {
    next(error);
  }
};