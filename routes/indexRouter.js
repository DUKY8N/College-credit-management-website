const express = require('express');
const router = express.Router();
const indexController = require("../controller/indexController");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/", (req, res) => res.redirect("/myGrades"));
router.get("/myGrades", authMiddleware.isLoginStatusOrRedirect, indexController.getMyGradesPage);
router.get("/myGrades/:date", authMiddleware.isLoginStatusOrRedirect, indexController.getMyGradesPage);
router.get(
    "/myGrades/:date/:scoreFilter/:scoreSort/:scoreOrder/",
    authMiddleware.isLoginStatusOrRedirect, indexController.getMyGradesPage
);
router.get(
    "/myGrades/:date/:scoreFilter/:scoreSort/:scoreOrder/:graduatedFilter/:graduatedSort/:graduatedOrder",
    authMiddleware.isLoginStatusOrRedirect, indexController.getMyGradesPage
);
router.get("/addSubject/:date", authMiddleware.isLoginStatusOrRedirect, indexController.getAddSubjectPage);
router.get("/editSubject/:date/:scoreFilter/:scoreSort/:scoreOrder/:subjectCode", authMiddleware.isLoginStatusOrRedirect, indexController.getEditSubjectPage);
router.get("/myFriends", authMiddleware.isLoginStatusOrRedirect, indexController.getMyFriendsPage);
router.get("/compareGrades/:friendsId", authMiddleware.isLoginStatusOrRedirect, indexController.getCompareGrades);
router.get(
    "/compareGrades/:friendsId/:filter/:sort/:order",
    authMiddleware.isLoginStatusOrRedirect, indexController.getCompareGrades
);
router.get("/login", authMiddleware.isLogoutStatusOrRedirect, indexController.getLogInPage);
router.get("/signup", authMiddleware.isLogoutStatusOrRedirect, indexController.getSignUpPage);
router.get("/accountSettings", authMiddleware.isLoginStatusOrRedirect, indexController.getAccountSettingsPage);

module.exports = router;