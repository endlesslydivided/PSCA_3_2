const TelegramBot = require('node-telegram-bot-api');
const token = '5321625201:AAENjPvAMZQDI8gw6aS-TpEMavZkK-eWPzE';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/date/, msg => {
    let date = new Date().toISOString().slice(0, 10);
    bot.sendMessage(msg.chat.id, 'Сегодняшная дата: ' + date);
});

bot.onText(/(.)/, msg => {
    bot.sendMessage(msg.chat.id, 'Echo: ' + msg.text);
});

bot.on('polling_error', (err) => console.error(err));


