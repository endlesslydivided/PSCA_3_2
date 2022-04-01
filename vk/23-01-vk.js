const express = require('express'), passport = require('passport'),  VkStrategy = require('passport-vkontakte/lib').Strategy;
const session = require('express-session')(
{
    resave: false,
    saveUninitialized: false,
    secret: '123456789'
});

const router = require('./routers/index')
const hbs = require('express-handlebars').create({extname: '.hbs'});
const config = require('../../config/config');

if (!config.VK_APP_ID || !config.VK_APP_SECRET) 
{
    throw new Error('Set VK_APP_ID and VK_APP_SECRET env vars to run the example');
}

passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(obj, done) { done(null, obj); });

passport.use(
    new VkStrategy(
    {
        clientID: config.VK_APP_ID,
        clientSecret: config.VK_APP_SECRET,
        callbackURL: config.VK_REDIRECT_URI,
        scope: ['email'],
        profileFields: ['email'],
    },
    function verify(accessToken, refreshToken, params, profile, done) 
    {
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

const app = express();

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.get('/api', router);


app.listen(config.PORT, () => 
{
    console.log(`http://localhost:${config.PORT}/`)
});

app.use(function (request, response, next) 
{
    response.status(404).send("Not Found")
});

