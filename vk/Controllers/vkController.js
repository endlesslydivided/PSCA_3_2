class vkController
{
    async auth(request,response)
    {
        request.logout();
        request.session.destroy(function (err) 
        {
            if (err) 
            {
                return next(err);
            }
            request.session = null;
            request.redirect('/');
        });
    }

    async callback(request,response)
    {
        response.redirect('/'); 
    }
}

module.exports = new vkController();