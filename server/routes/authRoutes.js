const {Router}= require('express');
const router = Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
router.get('/signup',authController.signup_get);
router.post('/signup',authController.signup_post);
router.get('/login',authController.login_get);
router.post('/login',authController.login_post);

// Remove 2 min waiting time
router.post('/sendloginotp',authController.sendloginotp_post);

// Remove 2 min waiting time
router.post('/sendsignupotp',authController.sendsignupotp_post);

// We'll remove this
router.post('/resendotp',authController.resendotp_post);
router.get('/logout',authController.logout_get);

router.get('/get-profile',authController.getProfileInfo)


router.post('/updateuser',userController.updateuser_post);


module.exports = router;