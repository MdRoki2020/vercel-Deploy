const express=require('express');
const router =express.Router();
const UsersController=require('../controllers/UsersController');
const TaskController=require('../controllers/TaskController');
const AuthVerifyMiddleware=require('../middleware/AuthVerifyMiddleware');

router.post("/registration",UsersController.registration);
router.post("/login",UsersController.login);
router.post("/profileUpdate",AuthVerifyMiddleware,UsersController.profileUpdate);
router.get("/profileDetails",AuthVerifyMiddleware,UsersController.profileDetails);

router.get("/RecoverVerifyEmail/:email",UsersController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",UsersController.RecoverVerifyOTP);
router.post("/RecoverResetPass/",UsersController.RecoverResetPass);


router.post("/createTask",AuthVerifyMiddleware,TaskController.createTask);
router.get("/deleteTask/:id",AuthVerifyMiddleware,TaskController.deleteTask);
router.get("/updateTaskStatus/:id/:status",AuthVerifyMiddleware,TaskController.updateTaskStatus);
router.get("/listTaskByStatus/:status",AuthVerifyMiddleware,TaskController.listTaskByStatus);
router.get("/taskStatusCount/",AuthVerifyMiddleware,TaskController.taskStatusCount);


module.exports=router;