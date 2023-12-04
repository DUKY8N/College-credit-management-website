const express = require('express');
const router = express.Router();
const usersController = require("../controller/usersController");
const authMiddleware = require("../middleware/authMiddleware");

//회원가입
router.post("/signUp", authMiddleware.isLogoutStatus, usersController.signUp);

//아이디중복확인
router.post("/idCheck", usersController.idCheck);

//로그인
router.post("/logIn", authMiddleware.isLogoutStatus, usersController.logIn);

//로그아웃
router.post("/logOut", authMiddleware.isLoginStatus, usersController.logOut);

//계정관리
router.post("/modifyUserInfo", authMiddleware.isLoginStatus, usersController.modifyUserInfo);

module.exports = router;
