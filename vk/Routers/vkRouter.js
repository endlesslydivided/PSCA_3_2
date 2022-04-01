const Router = require('express');
const vkController = require('../Controllers/vkController');
const router = new Router();

router.get('/auth/vk', passport.authenticate('vkontakte'),vkController.auth)
router.get('/auth/vk/callback', passport.authenticate('vkontakte', { failureRedirect: '/login' }),vkController.callback)

module.exports = router;