const passport = require("passport");
const createError = require("http-errors");
const usersModel = require("../model/usersModel");
const bcrypt = require("bcrypt");

exports.signUp = async function (req, res, next) {
    try {
      // 필수 입력 필드 검사
      const { id, password, checkedPassword, username } = req.body;
      if (!id || !password || !checkedPassword || !username) {
        console.log(id, password, checkedPassword, username);
        return next(createError(400, "Missing required fields"));
      }
  
      // ID 중복 검사
      if (await usersModel.checkIdDuplication(id)) {
        return next(createError(409, "ID already exists"));
      }
  
      // 비밀번호 일치성 검사
      if (password !== checkedPassword) {
        return next(createError(422, "Passwords do not match"));
      }
  
      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, 12); // 비밀번호 해싱 (비동기 함수)

      // 새 사용자 추가
      await usersModel.addNewUser({ id, hashedPassword, username });
      return res.status(201).json({ message: "Successfully signed up!" });
    } catch (error) {
      next(error);
    }
  };