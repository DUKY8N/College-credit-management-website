const express = require('express');
const router = express.Router();
const subjectsController = require("../controller/subjectsController");
const authMiddleware = require("../middleware/authMiddleware");

//*성적등록 (테스트완료)
router.post("/addScore", authMiddleware.isLoginStatus, subjectsController.addScore);

//*성적수정 (테스트완료)
router.post("/changeScore", authMiddleware.isLoginStatus, subjectsController.changeScore);

//*과목수정 (테스트완료)
router.post("/editSubject", authMiddleware.isLoginStatus, subjectsController.editSubject);

//과목상세정보
router.get("/getSubjectInfo/:subject_code/:date", authMiddleware.isLoginStatus, subjectsController.getSubjectInfo);

//*평균학점계산 (테스트완료)
router.post("/avgScore", authMiddleware.isLoginStatus, subjectsController.avgScore);

//*학기평균학점계산 (테스트완료)
router.post("/semesterAvgScore", authMiddleware.isLoginStatus, subjectsController.semesterAvgScore);

//*졸업요건비교 (테스트완료)
router.post("/Graduated", authMiddleware.isLoginStatus, subjectsController.Graduated);

//*들은과목수확인 (테스트완료)
router.post("/listenSubject", authMiddleware.isLoginStatus, subjectsController.listenSubject);

//*통합정렬 (테스트완료)
router.post("/totalScore", authMiddleware.isLoginStatus, subjectsController.filterAndSortScores);

//*성적삭제 (테스트완료)
router.post("/deleteScore", authMiddleware.isLoginStatus, subjectsController.deleteScore);

//*졸업요건정렬
router.post("/sortGraduated", authMiddleware.isLoginStatus, subjectsController.sortGraduated);

module.exports = router;