const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const homeRoutes = require('../homeroutes.js');

router.use('/users', userRoutes);
router.use('/', homeRoutes);

module.exports = router;