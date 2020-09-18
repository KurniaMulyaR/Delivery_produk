const router = require('express').Router();
const adminController = require('../controllers/adminController');
const {upload, uploadMultiple} = require('../middleware/multer');
const auth = require('../middleware/auth');

// router.get('/signin', adminController.viewSignin);
// router.post('/signin', adminController.actionSignin);
// router.use(auth);
// router.get('/logout', adminController.actionLogout);
router.get('/dashboard', adminController.viewDashboard);
router.get('/mechine/miling', adminController.viewMiling);

// Delivery
router.get('/delivery', adminController.viewdelivery);
router.post('/delivery', adminController.addDelivery);
router.put('/delivery', adminController.editDelivery);
router.delete('/delivery/:id', adminController.deleteDelivery);

// Schedule
router.get('/delivery/show-schedule/:deliveryId', adminController.viewSchedule);
router.post('/delivery/add/schedule', adminController.addSchedule);
router.get('/delivery/schedule/:id', adminController.showEditSchedule);
router.put('/delivery/schedule/:id', adminController.editSchedule);
router.delete('/delivery/:deliveryId/schedule/:id', adminController.deleteSchedule);

module.exports = router;