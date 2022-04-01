const Router = require('express');
const router = new Router()
const vkrouter = require('./vkrouter')


router.use('/auth', vkrouter)

router.get('/',function(request,response)
{
    response.render('index', 
    {
        user: request.user,
        account: JSON.stringify(request.user, null, 2)
    });
})

router.get('/resource', ensureAuthenticated, function(req, res){
    res.render('resource', { user: req.user });
});

router.get('/login', function(req, res)
{
    res.render('login', { user: req.user });
});

router.get('/logout', function(req, res) 
{
    req.session.logout = true;
    req.session.destroy(e => 
    {
        req.logout();
        res.redirect("/login");
    });
});

function ensureAuthenticated(req, res, next) 
{
    if (req.isAuthenticated()) 
    { 
        return next(); 
    }
    res.redirect('/login')
}

module.exports = router